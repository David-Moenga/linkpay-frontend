"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clearTokens } from "@/lib/api";

const APP_NAV = [
  { href: "/dashboard", label: "Home" },
  { href: "/send", label: "Send" },
  { href: "/receive", label: "Receive" },
  { href: "/merchant", label: "Merchant" },
  { href: "/history", label: "History" },
];

const PUBLIC_NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/business", label: "For business" },
  { href: "/security", label: "Security" },
];

export default function Nav() {
  const [authed, setAuthed] = useState(false);
  const pathname = usePathname();
  useEffect(() => setAuthed(!!localStorage.getItem("access_token")), [pathname]);

  function logout() { clearTokens(); window.location.href = "/"; }

  return (
    <>
      <header className="border-b border-border bg-white/95 backdrop-blur md:sticky md:top-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-charcoal-800">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-charcoal-800 text-gold-600">LP</span>
            LinkPay
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-charcoal-600 md:flex">
            {(!authed ? PUBLIC_NAV : []).map((n) => (
              <Link key={n.href} href={n.href} className="transition hover:text-gold-600">{n.label}</Link>
            ))}
            {authed ? (
              <button onClick={logout} className="rounded-lg bg-surface-2 px-3 py-1.5 text-charcoal-700 transition hover:bg-border">Logout</button>
            ) : (
              <>
                <Link href="/login" className="transition hover:text-gold-600">Login</Link>
                <Link href="/register" className="rounded-lg bg-charcoal-800 px-3 py-1.5 text-white transition hover:bg-charcoal-700">Sign up</Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            {authed ? (
              <button onClick={logout} className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm text-charcoal-700">Logout</button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[#2563eb]">Login</Link>
                <Link href="/register" className="rounded-lg bg-charcoal-800 px-3 py-1.5 text-sm text-white">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {authed && (
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-white/95 backdrop-blur md:hidden">
          {APP_NAV.map((n) => {
            const active = pathname === n.href || pathname?.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex min-h-[44px] flex-col items-center justify-center py-2 text-[11px] font-semibold transition ${
                  active ? "text-[#2563eb]" : "text-slate-600 hover:text-[#2563eb]"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
