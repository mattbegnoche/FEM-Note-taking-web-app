import { prisma } from "./prisma";
import { requireUser } from "./session";

export async function getFontTheme() {
  const user = await requireUser();
  const row = await prisma.user.findUnique({
    where: { id: user.id },
    select: { fontTheme: true },
  });
  return row?.fontTheme ?? "SANS";
}
