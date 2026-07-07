import { getFontTheme } from "@/lib/preferences";
import FontThemeForm from "./_components/FontThemeForm";

export default async function FontThemePage() {
  const current = await getFontTheme();
  console.log(current);

  return <FontThemeForm current={current} />;
}
