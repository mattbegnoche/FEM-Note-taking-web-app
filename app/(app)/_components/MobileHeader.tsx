import Link from "next/link";

export default function MobileHeader() {
  return (
    <header className="flex md:hidden h-14 shrink-0 items-center bg-muted px-4">
      <Link href="/notes" className="text-xl font-bold">
        Notes
      </Link>
    </header>
  );
}
