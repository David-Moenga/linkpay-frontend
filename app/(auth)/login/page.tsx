"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/api";
import { auth } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res: any = await auth.login({ email, password });
      setTokens(res.access, res.refresh);
      if (res.user?.username) localStorage.setItem("me_username", res.user.username);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-border bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">Welcome back</span>
        <h2 className="mt-2 text-3xl font-bold text-charcoal-800">Sign in to LinkPay</h2>
        <p className="mt-3 text-slate-600">
          Access your wallet, send and receive payments, and stay on top of every transaction.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-surface-2 p-4 text-sm text-slate-600">
          <p className="font-semibold text-charcoal-700">Test environment</p>
          <p className="mt-1">Balances are simulated and clearly labeled. Not real money.</p>
          <p className="mt-2">Demo: <span className="font-mono">alice@test.com</span> / <span className="font-mono">Strong!pass123</span></p>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-border-strong px-4 py-2.5 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border border-border-strong px-4 py-2.5 pr-12 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-2 my-auto h-8 rounded-md px-2 text-xs font-semibold text-slate-500 transition hover:text-[#2563eb]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-charcoal-800 py-2.5 font-semibold text-white transition hover:bg-charcoal-700 disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-sm text-slate-500">
          New to LinkPay? <a href="/register" className="font-semibold text-[#2563eb] hover:text-[#2563eb]">Create an account</a>
        </p>
      </form>
    </div>
  );
}
