"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearTokens } from "@/lib/api";

export default function Nav() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => setAuthed(!!localStorage.getItem("access_token")), []);
  function logout() { clearTokens(); window.location.href = "/"; }
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-indigo-600">LinkPay</Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
          <Link href="/send" className="hover:text-indigo-600">Send</Link>
          <Link href="/receive" className="hover:text-indigo-600">Receive</Link>
          <Link href="/merchant" className="hover:text-indigo-600">Merchant</Link>
          <Link href="/history" className="hover:text-indigo-600">History</Link>
          {authed ? (
            <button onClick={logout} className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200">Logout</button>
          ) : (
            <>
              <Link href="/login" className="hover:text-indigo-600">Login</Link>
              <Link href="/register" className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
