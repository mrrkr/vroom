import Link from "next/link";

export function Tabs({ items }: { items: { href: string; label: string; active: boolean }[] }) {
  return (
    <div className="mb-5 flex gap-1">
      {items.map((t) => (
        <Link key={t.href} href={t.href}
          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-sm border ${t.active ? "bg-pink text-black border-pink" : "bg-panel border-line hover:border-pink"}`}>
          {t.label}
        </Link>
      ))}
    </div>
  );
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-[18px] font-bold py-4 flex items-center gap-2">{children}</h1>;
}
