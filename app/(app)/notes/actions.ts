"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function updateNote(formData: FormData) {
  const user = await requireUser();

  const id = formData.get("id") as string;
  const title = ((formData.get("title") as string) ?? "").trim();
  const content = (formData.get("content") as string) ?? "";
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!title) return { ok: false, error: "A title is required" };

  try {
    await prisma.note.update({
      where: { id, userId: user.id },
      data: { title, content, tags },
    });
  } catch {
    return { ok: false, error: "Couldn't save the note. Please try again." };
  }

  revalidatePath("/notes");
  return { ok: true };
}

export async function archiveNote(id: string) {
  const user = await requireUser();
  await prisma.note.update({
    where: { id, userId: user.id },
    data: { isArchived: true },
  });
}

export async function deleteNote(id: string) {
  const user = await requireUser();
  await prisma.note.delete({
    where: { id, userId: user.id },
  });
  revalidatePath("/notes");
}
