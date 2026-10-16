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
      <div className="min-w-0 space-y-6 overflow-x-hidden">{children}</div>
    </div>
  );
}
