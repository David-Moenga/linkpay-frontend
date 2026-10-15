"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/navigation/Sidebar";
import { wallet } from "@/lib/api";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
      return;
    }
    setReady(true);
    wallet
      .overview()
      .then((w: any) => {
        if (w?.username) localStorage.setItem("me_username", w.username);
        if (w?.account_type) localStorage.setItem("me_account_type", w.account_type);
      })
      .catch(() => {});
  }, [router]);

  if (!ready) {
    return (
      <div className="grid gap-6 md:grid-cols-[15rem_1fr]">
        <div className="hidden md:block">
          <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[15rem_1fr]">
      <Sidebar />
      <div className="min-w-0 space-y-6">
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 text-xs">
            {[
              { href: "/dashboard", label: "Home" },
              { href: "/send", label: "Send" },
              { href: "/receive", label: "Receive" },
              { href: "/requests", label: "Requests" },
              { href: "/history", label: "History" },
              { href: "/merchant", label: "Merchant" },
            ].map((l) => (
              <LinkChip key={l.href} href={l.href} label={l.label} />
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function LinkChip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="whitespace-nowrap rounded-full border border-border bg-white px-3 py-1.5 font-medium text-charcoal-700 shadow-sm"
    >
      {label}
    </a>
  );
}
