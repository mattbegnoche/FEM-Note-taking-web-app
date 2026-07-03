"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export async function updateNote(formData: FormData) {
  const user = await requireUser();

  const id = formData.get("id") as string;
  const title = ((formData.get("title") as string) ?? "").trim();
  const content = (formData.get("content") as string) ?? "";
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!id || !title) throw new Error("A title is required");

  await prisma.note.update({
    where: { id, userId: user.id },
    data: { title, content, tags },
  });

  revalidatePath("/notes");
}
