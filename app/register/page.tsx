"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/api";
import { auth } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "", account_type: "individual", business_name: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res: any = await auth.register(form);
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
      <h2 className="text-2xl font-bold">Create account</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm">Username</label>
          <input className="mt-1 w-full rounded border px-3 py-2" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} required />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input type="email" className="mt-1 w-full rounded border px-3 py-2" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input type="password" className="mt-1 w-full rounded border px-3 py-2" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
        </div>
        <div>
          <label className="text-sm">Account type</label>
          <select className="mt-1 w-full rounded border px-3 py-2" value={form.account_type} onChange={(e)=>setForm({...form,account_type:e.target.value})}>
            <option value="individual">Individual / Customer</option>
            <option value="merchant">Merchant / Small business</option>
            <option value="freelancer">Freelancer</option>
            <option value="service_provider">Service provider</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>
        {(form.account_type==="merchant"||form.account_type==="supplier") && (
          <div>
            <label className="text-sm">Business name</label>
            <input className="mt-1 w-full rounded border px-3 py-2" value={form.business_name} onChange={(e)=>setForm({...form,business_name:e.target.value})} />
          </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50">
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
