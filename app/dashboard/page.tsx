"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { wallet, transactions } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [walletData, setWalletData] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    (async () => {
      try {
        const [w, t] = await Promise.all([wallet.overview(), transactions.list()]);
        setWalletData(w);
        setTxs(t || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
        Test environment: balances shown are simulated test funds, not real money.
      </div>
      <section className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Wallet</h2>
        <p className="mt-2 text-sm text-slate-500">Public ID: {walletData?.public_id}</p>
        <p className="mt-1 text-sm text-slate-500">Account: {walletData?.display_name} ({walletData?.account_type})</p>
        <p className="mt-4 text-3xl font-bold text-emerald-600">
          {walletData?.currency} {Number(walletData?.balance).toLocaleString()}
        </p>
      </section>
      <section className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Recent activity</h2>
        {txs.length === 0 ? <p className="mt-2 text-slate-500">No transactions yet.</p> : (
          <ul className="mt-3 divide-y">
            {txs.slice(0,5).map((t:any) => (
              <li key={t.id} className="py-2 text-sm">
                <span className="font-medium">{t.reference}</span> · {t.transaction_type} · {t.amount} {t.currency} · <span className="text-slate-500">{t.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
