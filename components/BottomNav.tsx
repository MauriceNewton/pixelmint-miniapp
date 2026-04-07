"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Mint" },
  { href: "/collection", label: "Collection" },
  { href: "/transfer", label: "Transfer" },
  { href: "/about", label: "About" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      {links.map((link) => (
        <Link key={link.href} className={pathname === link.href ? "active" : ""} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

