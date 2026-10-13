"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearTokens } from "@/lib/api";

export default function Nav() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    setAuthed(!!localStorage.getItem("access_token"));
  }, []);
  function logout() {
    clearTokens();
    window.location.href = "/login";
  }
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-emerald-600">LinkPay</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-emerald-600">Dashboard</Link>
          <Link href="/transfer" className="hover:text-emerald-600">Send</Link>
          <Link href="/requests" className="hover:text-emerald-600">Requests</Link>
          <Link href="/history" className="hover:text-emerald-600">History</Link>
          {authed ? (
            <button onClick={logout} className="rounded bg-slate-100 px-3 py-1 hover:bg-slate-200">Logout</button>
          ) : (
            <>
              <Link href="/login" className="hover:text-emerald-600">Login</Link>
              <Link href="/register" className="rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
