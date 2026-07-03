import "server-only";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export async function getNotes() {
  const user = await requireUser();
  return prisma.note.findMany({
    where: { userId: user.id, isArchived: false },
    orderBy: { lastEdited: "desc" },
  });
}

export async function getNote(id: string) {
  const user = await requireUser();
  return prisma.note.findUnique({
    where: { id, userId: user.id },
  });
}
