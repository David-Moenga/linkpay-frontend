"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { wallet, transactions, requests } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [walletData, setWalletData] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [pendingReqs, setPendingReqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    (async () => {
      try {
        const [w, t, r] = await Promise.all([wallet.overview(), transactions.list(), requests.list()]);
        setWalletData(w);
        setTxs(t || []);
        setPendingReqs((r || []).filter((x: any) => x.status === "pending"));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return <p className="text-muted">Loading dashboard…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const recentRecipients = Array.from(
    new Map(
      txs
        .filter((t: any) => t.recipient_username)
        .map((t: any) => [t.recipient_username, { username: t.recipient_username, name: t.recipient_name }])
    ).values()
  ).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white shadow-lg">
        <p className="text-sm opacity-90">Available balance</p>
        <p className="mt-1 text-4xl font-bold tracking-tight">
          {walletData?.currency} {Number(walletData?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className="mt-2 text-xs opacity-80">Test balance (simulated). Not real money.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/send" className="rounded-lg bg-white px-4 py-2 font-semibold text-emerald-700 hover:bg-slate-50">Send money</Link>
          <Link href="/receive" className="rounded-lg border border-white/40 px-4 py-2 font-semibold hover:bg-white/10">Receive</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Wallet ID</p>
          <p className="mt-1 font-mono text-sm font-semibold">{walletData?.public_id}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Pending requests</p>
          <p className="mt-1 text-2xl font-bold">{pendingReqs.length}</p>
        </div>
        <Link href="/merchant" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-300">
          <p className="text-sm text-slate-500">Merchant tools</p>
          <p className="mt-1 text-2xl font-bold">Open →</p>
        </Link>
      </div>

      {recentRecipients.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Frequent recipients</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {recentRecipients.map((r: any) => (
              <Link
                key={r.username}
                href={`/send?to=${encodeURIComponent(r.username)}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm hover:border-indigo-300 hover:bg-slate-50"
              >
                {r.name} <span className="text-slate-400">@{r.username}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent transactions</h2>
            <Link href="/history" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
          </div>
          {txs.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No transactions yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {txs.slice(0, 5).map((t: any) => (
                <li key={t.id} className="py-2">
                  <Link href={`/transactions/${t.reference}`} className="flex items-center justify-between hover:text-indigo-600">
                    <div>
                      <p className="text-sm font-medium">{t.transaction_type.replace("_", " ")}</p>
                      <p className="text-xs text-slate-500">{t.recipient_name} · {new Date(t.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-semibold">{Number(t.amount).toLocaleString()} {t.currency}</p>
                      <p className={t.status === "completed" ? "text-emerald-600 text-xs" : "text-amber-600 text-xs"}>{t.status}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pending payment requests</h2>
            <Link href="/requests" className="text-sm text-indigo-600 hover:text-indigo-700">Manage</Link>
          </div>
          {pendingReqs.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No pending requests.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {pendingReqs.slice(0, 5).map((r: any) => (
                <li key={r.id} className="py-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{r.reference}</p>
                    <p className="text-xs text-slate-500">{r.merchant_name} · {r.amount} {r.currency}</p>
                  </div>
                  {r.merchant_username !== localStorage.getItem("me_username") && (
                    <button
                      onClick={async () => {
                        try { await requests.pay(r.reference); router.refresh(); }
                        catch {}
                        (async () => {
                          const [t, rr] = await Promise.all([transactions.list(), requests.list()]);
                          setTxs(t || []); setPendingReqs((rr || []).filter((x: any) => x.status === "pending"));
                        })();
                      }}
                      className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                      Pay
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
