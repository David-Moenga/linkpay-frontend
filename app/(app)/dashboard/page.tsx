"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { wallet, transactions, requests } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { statusVariant } from "@/lib/status";

export default function DashboardPage() {
  const router = useRouter();
  const [walletData, setWalletData] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [pendingReqs, setPendingReqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
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
  }

  useEffect(() => {
    if (!localStorage.getItem("access_token")) { router.push("/login"); return; }
    load();
  }, [router]);

  const me = walletData?.username || (typeof window !== "undefined" ? localStorage.getItem("me_username") : null);

  useEffect(() => {
    if (walletData?.username && typeof window !== "undefined") {
      localStorage.setItem("me_username", walletData.username);
    }
  }, [walletData?.username]);

  if (loading) {
    return (
      <div className="py-16 text-center text-muted">
        <div className="mx-auto max-w-xs space-y-3">
          <div className="h-3 rounded bg-slate-200 animate-pulse" />
          <div className="h-3 rounded bg-slate-200 animate-pulse w-2/3 mx-auto" />
        </div>
      </div>
    );
  }
  if (error) return <p className="text-danger">{error}</p>;

  const isBusiness = ["merchant", "freelancer", "service_provider", "supplier"].includes(walletData?.account_type);
  const incoming = txs.filter((t: any) => t.recipient_username === me && t.status === "completed");
  const outgoing = txs.filter((t: any) => t.sender_username === me && t.status === "completed");
  const totalIn = incoming.reduce((s, t) => s + Number(t.amount), 0);
  const totalOut = outgoing.reduce((s, t) => s + Number(t.amount), 0);
  const now = new Date();
  const todayKey = now.toDateString();
  const todayPayments = txs.filter((t: any) => t.status === "completed" && new Date(t.created_at).toDateString() === todayKey).length;
  const monthVolume = txs
    .filter((t: any) => {
      const d = new Date(t.created_at);
      return t.status === "completed" && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((s: number, t: any) => s + Number(t.amount), 0);
  const frequentCustomers = Array.from(new Set(incoming.map((t: any) => t.sender_username))).slice(0, 6);

  const frequentRecipients = Array.from(
    new Map(
      txs
        .filter((t: any) => t.recipient_username && t.recipient_username !== me)
        .map((t: any) => [t.recipient_username, { username: t.recipient_username, name: t.recipient_name, count: 0 }])
    ).values()
  ).slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Good to see you</p>
          <h1 className="text-3xl font-bold tracking-tight text-charcoal-800">
            {walletData?.display_name}
          </h1>
          <p className="text-sm text-muted">
            {walletData?.account_type?.replace("_", " ")} · {walletData?.public_id}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/send" className="rounded-md bg-gold-600 px-4 py-2 text-center text-sm font-bold text-charcoal-900 transition hover:bg-gold-500 hover:shadow-md">
            Send money
          </Link>
          <Link href="/receive" className="rounded-md border border-border-strong px-4 py-2 text-center text-sm font-semibold text-charcoal-700 transition hover:bg-surface-2">
            Receive
          </Link>
          <Link href="/requests" className="rounded-md border border-border-strong px-4 py-2 text-center text-sm font-semibold text-charcoal-700 transition hover:bg-surface-2">
            New request
          </Link>
        </div>
      </div>

      {/* Balance + activity summary */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card variant="dark" className="lg:col-span-2">
          <p className="text-sm text-slate-300">Available balance</p>
          <p className="mt-1 text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums break-all">
            {walletData?.currency} {Number(walletData?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-2 text-xs text-slate-400">Test balance (simulated). Not real money.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Received</p>
              <p className="mt-1 font-bold tabular-nums text-gold-400">
                +{totalIn.toLocaleString()} {walletData?.currency}
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Sent</p>
              <p className="mt-1 font-bold tabular-nums text-white">
                -{totalOut.toLocaleString()} {walletData?.currency}
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Transactions</p>
              <p className="mt-1 font-bold tabular-nums text-white">{txs.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Account</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Status</dt>
              <dd className="font-medium text-charcoal-900">
                <Badge variant={walletData?.is_verified ? "success" : "gold"}>{walletData?.is_verified ? "Verified" : "Unverified"}</Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Currency</dt>
              <dd className="font-medium text-charcoal-900">{walletData?.currency}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted shrink-0">Public ID</dt>
              <dd className="font-medium text-charcoal-900 font-mono text-xs truncate max-w-[10rem]">{walletData?.public_id}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Joined</dt>
              <dd className="font-medium text-charcoal-900">
                {walletData?.date_joined ? new Date(walletData.date_joined).toLocaleDateString() : walletData?.created_at ? new Date(walletData.created_at).toLocaleDateString() : "—"}
              </dd>
            </div>
          </dl>
          {pendingReqs.length > 0 && (
            <div className="mt-4 rounded-md bg-warning-soft px-3 py-2 text-xs font-semibold text-warning">
              {pendingReqs.length} pending payment request{pendingReqs.length > 1 ? "s" : ""}
            </div>
          )}
        </Card>
      </div>

      {isBusiness && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal-900">Business overview</h2>
            <Link href="/merchant" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
              Open merchant dashboard
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-border bg-surface-2 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Today's payments</p>
              <p className="mt-1 font-bold tabular-nums text-charcoal-900">{todayPayments}</p>
            </div>
            <div className="rounded-md border border-border bg-surface-2 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Monthly volume</p>
              <p className="mt-1 font-bold tabular-nums text-charcoal-900">
                {monthVolume.toLocaleString()} {walletData?.currency}
              </p>
            </div>
            <div className="rounded-md border border-border bg-surface-2 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Outstanding invoices</p>
              <p className="mt-1 font-bold tabular-nums text-charcoal-900">{pendingReqs.length}</p>
            </div>
          </div>
          {frequentCustomers.length > 0 && (
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">Frequent customers</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {frequentCustomers.map((c: string) => (
                  <span key={c} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-charcoal-600">
                    @{c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {frequentRecipients.length > 0 && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal-900">Frequent recipients</h2>
            <Link href="/send" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
              Send to one
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {frequentRecipients.map((r: any) => (
              <Chip key={r.username}>
                <Link
                  href={`/send?to=${encodeURIComponent(r.username)}`}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">
                    {r.name?.[0]?.toUpperCase() || r.username[0].toUpperCase()}
                  </span>
                  <span className="font-medium text-charcoal-900">{r.name}</span>
                  <span className="text-slate-400">@{r.username}</span>
                </Link>
              </Chip>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal-900">Recent transactions</h2>
            <Link href="/history" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
              View all
            </Link>
          </div>
          {txs.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              description="Send or receive your first payment to see activity here."
            >
              <Link href="/send" className="rounded-md bg-charcoal-800 px-4 py-2 text-sm font-semibold text-white hover:bg-charcoal-900">
                Send money
              </Link>
              <Link href="/receive" className="rounded-md border border-border-strong px-4 py-2 text-sm font-semibold text-charcoal-700 hover:bg-surface-2">
                Receive
              </Link>
            </EmptyState>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {txs.slice(0, 6).map((t: any) => (
                <li key={t.id}>
                  <Link
                    href={`/transactions/${t.reference}`}
                    className="flex items-center justify-between gap-3 py-3 -mx-2 px-2 rounded-md hover:bg-surface-2 transition"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                          t.recipient_username === me ? "bg-success-soft text-success" : "bg-surface-2 text-charcoal-600"
                        }`}
                      >
                        {t.recipient_username === me ? "↓" : "↑"}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-charcoal-900">{t.transaction_type.replace("_", " ")}</p>
                        <p className="text-xs text-muted">
                          {t.recipient_username === me ? t.sender_name : t.recipient_name} ·{" "}
                          {new Date(t.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`text-sm font-semibold tabular-nums ${t.recipient_username === me ? "text-success" : "text-charcoal-900"}`}>
                        {t.recipient_username === me ? "+" : "-"}
                        {Number(t.amount).toLocaleString()} {t.currency}
                      </p>
                      <span className={`inline-block mt-0.5 text-xs ${statusVariant(t.status) === "success" ? "text-success" : "text-muted"}`}>
                        {t.status}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal-900">Pending payment requests</h2>
            <Link href="/requests" className="text-sm font-semibold text-gold-600 transition hover:text-gold-700">
              Manage
            </Link>
          </div>
          {pendingReqs.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No pending requests.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {pendingReqs.slice(0, 6).map((r: any) => (
                <li key={r.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-charcoal-900">{r.reference}</p>
                    <p className="text-xs text-muted">
                      {r.merchant_name} · {r.amount} {r.currency}
                    </p>
                  </div>
                  {r.merchant_username !== me && (
                    <Button
                      size="sm"
                      onClick={async () => {
                        try { await requests.pay(r.reference); } catch {}
                        load();
                      }}
                    >
                      Pay
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Security note */}
      <Card variant="tinted">
        <p className="text-sm text-charcoal-900">
          <strong>Security tip:</strong> verify the recipient name and username before authorizing any payment. Report
          suspicious activity from the transaction detail page.
        </p>
      </Card>
    </div>
  );
}

