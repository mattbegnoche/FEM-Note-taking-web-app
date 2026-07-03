import "dotenv/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { prisma } from "../lib/prisma";

type SeedNote = {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
};

async function main() {
  const email = process.env.SEED_USER_EMAIL;
  if (!email) throw new Error("Set SEED_USER_EMAIL to your Google email");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(`No user found for ${email} — sign in once first`);

  const file = readFileSync(path.join(process.cwd(), "db.json"), "utf8");
  const { notes } = JSON.parse(file) as { notes: SeedNote[] };

  for (const note of notes) {
    await prisma.note.upsert({
      where: { id: note.id },
      update: {},
      create: {
        id: note.id,
        title: note.title,
        content: note.content,
        tags: note.tags,
        isArchived: note.isArchived,
        lastEdited: new Date(note.lastEdited),
        userId: user.id,
      },
    });
  }

  console.log(`Seeded ${notes.length} notes for ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
