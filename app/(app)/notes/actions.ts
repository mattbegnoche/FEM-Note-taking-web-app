"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export type ActionResult = { ok: true } | { ok: false; error: string };

function parseNoteForm(formData: FormData) {
  const title = ((formData.get("title") as string) ?? "")
    .replace(/\s+/g, " ")
    .trim();
  const content = (formData.get("content") as string) ?? "";
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return { title, content, tags };
}

export async function updateNote(formData: FormData): Promise<ActionResult> {
  const user = await requireUser();

  const id = formData.get("id") as string;
  const { title, content, tags } = parseNoteForm(formData);

  if (!id) return { ok: false, error: "Missing note id" };
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

export async function createNote(
  formData: FormData,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const user = await requireUser();

  const { title, content, tags } = parseNoteForm(formData);

  if (!title) return { ok: false, error: "A title is required" };

  let note;
  try {
    note = await prisma.note.create({
      data: { title, content, tags, userId: user.id },
    });
  } catch {
    return { ok: false, error: "Couldn't create the note. Please try again." };
  }

  revalidatePath("/notes");
  return { ok: true, id: note.id };
}

export async function archiveNote(id: string): Promise<ActionResult> {
  const user = await requireUser();

  try {
    await prisma.note.update({
      where: { id, userId: user.id },
      data: { isArchived: true },
    });
  } catch {
    return { ok: false, error: "Couldn't archive the note. Please try again." };
  }

  revalidatePath("/notes");
  return { ok: true };
}

export async function unarchiveNote(id: string): Promise<ActionResult> {
  const user = await requireUser();

  try {
    await prisma.note.update({
      where: { id, userId: user.id },
      data: { isArchived: false },
    });
  } catch {
    return { ok: false, error: "Couldn't archive the note. Please try again." };
  }

  revalidatePath("/notes/archived");
  return { ok: true };
}

export async function deleteNote(id: string): Promise<ActionResult> {
  const user = await requireUser();

  try {
    await prisma.note.delete({
      where: { id, userId: user.id },
    });
  } catch {
    return { ok: false, error: "Couldn't delete the note. Please try again." };
  }

  revalidatePath("/notes");
  return { ok: true };
}
