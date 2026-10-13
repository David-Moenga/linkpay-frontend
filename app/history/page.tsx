"use client";
import { useEffect, useState } from "react";
import { transactions, reports } from "@/lib/api";

export default function HistoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { window.location.href="/login"; return; }
    (async () => {
      try { setItems(await transactions.list() || []); }
      catch (e: any) { setError(e.message); }
    })();
  }, []);

  async function report(t: any) {
    const reason = prompt("Reason for report?");
    if (!reason) return;
    const me = localStorage.getItem("me_username");
    const otherId = t.recipient_username !== me ? t.recipient : t.sender;
    try {
      await reports.create({ reported_user: otherId, transaction: t.id, reason });
      alert("Report submitted");
    } catch (e: any) { alert(e.message); }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Transaction history</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {items.length === 0 && <p className="text-slate-500">No transactions.</p>}
      {items.map((t:any)=>(
        <div key={t.id} className="rounded border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t.reference}</p>
              <p className="text-sm text-slate-500">{t.transaction_type} · {t.sender_name} → {t.recipient_name}</p>
              <p className="text-sm">{t.amount} {t.currency} · {t.status} · {new Date(t.created_at).toLocaleString()}</p>
              {t.description && <p className="text-xs text-slate-400">{t.description}</p>}
              {t.invoice_reference && <p className="text-xs text-slate-400">Invoice: {t.invoice_reference}</p>}
            </div>
            <button onClick={()=>report(t)} className="text-xs text-red-600 hover:underline">Report</button>
          </div>
        </div>
      ))}
    </div>
  );
}
