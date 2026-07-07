"use server";

import { requireUser } from "@/lib/session";
import { ActionResult } from "../notes/actions";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { FontTheme } from "@/lib/generated/prisma/client";

export async function updateFontTheme(
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();
  const fontTheme = formData.get("fontTheme") as string;

  if (!["SANS", "SERIF", "MONO"].includes(fontTheme))
    return { ok: false, error: "Invalid font choice" };

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { fontTheme: fontTheme as FontTheme },
    });
  } catch {
    return { ok: false, error: "Couldn't save your preference." };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}
