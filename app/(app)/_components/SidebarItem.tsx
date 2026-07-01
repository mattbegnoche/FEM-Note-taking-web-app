import Link from "next/link";

function SidebarItem({
  href,
  pathname,
  icon: Icon,
  label,
}: {
  href: string;
  pathname: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const isActive = href === pathname;
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}

export default SidebarItem;
