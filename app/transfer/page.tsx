"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { transactions, users } from "@/lib/api";

export default function TransferPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [lookup, setLookup] = useState<any[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function doLookup(q: string) {
    setUsername(q);
    if (q.length < 2) { setLookup([]); return; }
    try {
      const res: any = await users.lookup(q);
      setLookup(res.results || []);
    } catch {}
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await transactions.transfer({ recipient_username: username, amount, description });
      setResult(res);
      setConfirming(false);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-md rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-600">Transfer complete</h2>
        <p className="mt-2 text-sm">Reference: {result.reference}</p>
        <p className="text-sm">Amount: {result.amount} {result.currency}</p>
        <button onClick={()=>router.push("/dashboard")} className="mt-4 rounded bg-emerald-600 px-4 py-2 text-white">Dashboard</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h2 className="text-xl font-bold">Send money</h2>
      <div>
        <label className="text-sm">Recipient username</label>
        <input className="mt-1 w-full rounded border px-3 py-2" value={username} onChange={(e)=>doLookup(e.target.value)} required />
        {lookup.length > 0 && (
          <ul className="mt-1 rounded border bg-white shadow">
            {lookup.map((u:any)=>(
              <li key={u.id} className="cursor-pointer px-3 py-2 hover:bg-slate-100" onClick={()=>{setUsername(u.username); setLookup([]);}}>
                {u.display_name} (@{u.username}) — {u.account_type}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label className="text-sm">Amount (KES)</label>
        <input type="number" className="mt-1 w-full rounded border px-3 py-2" value={amount} onChange={(e)=>setAmount(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm">Description</label>
        <input className="mt-1 w-full rounded border px-3 py-2" value={description} onChange={(e)=>setDescription(e.target.value)} />
      </div>

      {!confirming ? (
        <button onClick={()=>setConfirming(true)} disabled={!username||!amount} className="w-full rounded bg-emerald-600 py-2 text-white hover:bg-emerald-700 disabled:opacity-50">Review</button>
      ) : (
        <div className="rounded border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm">Send {amount} KES to @{username}</p>
          <p className="text-sm text-slate-500">{description}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={submit} disabled={loading} className="flex-1 rounded bg-emerald-600 py-2 text-white hover:bg-emerald-700 disabled:opacity-50">
              {loading ? "Sending..." : "Confirm & Send"}
            </button>
            <button onClick={()=>setConfirming(false)} className="flex-1 rounded border py-2">Back</button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
