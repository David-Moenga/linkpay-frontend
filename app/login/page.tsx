"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/api";
import { auth } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="mx-auto max-w-md rounded border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm">Email</label>
          <input type="email" className="mt-1 w-full rounded border px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input type="password" className="mt-1 w-full rounded border px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
