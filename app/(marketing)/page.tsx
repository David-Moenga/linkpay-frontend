import Link from "next/link";

const mockTransactions = [
  { name: "Green Basket Shop", detail: "Payment received · Today", amount: "+ KES 1,500", sign: "in" },
  { name: "Studio Creative", detail: "Service payment · Yesterday", amount: "− KES 2,000", sign: "out" },
  { name: "Quick Supplies", detail: "Supplier payment · Yesterday", amount: "− KES 850", sign: "out" },
];

export default function Home() {
  return (
    <div className="-mx-4">
      <section className="relative overflow-hidden bg-charcoal-800">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-gold-600/20 blur-3xl" aria-hidden />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-900/70 to-transparent" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-gold-200 backdrop-blur">
                Testnet demo · Simulated balances · Not real money
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                LinkPay: One network. Many transactions.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-200">
                A connected wallet network for individuals, merchants, freelancers, suppliers and service providers.
              </p>
              <p className="mt-3 max-w-xl text-sm text-slate-300">
                Discover participants, send and receive payments, issue invoices, request money and keep a
                trusted transaction history — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="rounded-lg bg-gold-600 px-6 py-3 font-bold text-charcoal-900 shadow-lg shadow-black/20 transition hover:bg-gold-500">
                  Get started free
                </Link>
                <Link href="/login" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                  Log in
                </Link>
                <Link href="/how-it-works" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                  How it works
                </Link>
              </div>
              <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                {[
                  { k: "5", v: "Participant groups" },
                  { k: "1", v: "Shared experience" },
                  { k: "∞", v: "Repeat relationships" },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                    <p className="text-2xl font-bold text-gold-400">{s.k}</p>
                    <p className="text-xs text-slate-300">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live product preview */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold-600/30 blur-2xl" aria-hidden />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
                <div className="rounded-2xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-charcoal-800 text-xs font-bold text-gold-600">LP</span>
                      <span className="text-sm font-bold text-charcoal-800">LinkPay</span>
                    </div>
                    <span className="rounded-full bg-gold-100 px-2 py-1 text-[10px] font-semibold text-gold-700">Testnet</span>
                  </div>
                  <div className="mt-4 rounded-2xl bg-charcoal-800 p-5 text-white">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-300">Available demo balance</p>
                      <span className="text-xs text-slate-300">👁</span>
                    </div>
                    <p className="mt-2 text-3xl font-bold tabular-nums">KES 24,850.00</p>
                    <p className="mt-1 text-[10px] text-slate-400">DEMO DATA · NOT REAL MONEY</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-gold-600 py-2 text-center text-sm font-bold text-charcoal-900">Send</div>
                      <div className="rounded-lg border border-white/20 py-2 text-center text-sm font-semibold text-white">Receive</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-border bg-surface-2 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-muted">Received</p>
                      <p className="mt-1 text-sm font-bold text-success">+KES 8,500</p>
                    </div>
                    <div className="rounded-lg border border-border bg-surface-2 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-muted">Sent</p>
                      <p className="mt-1 text-sm font-bold text-charcoal-800">-KES 3,200</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-semibold text-charcoal-800">Recent activity</p>
                  <div className="mt-2 space-y-2">
                    {mockTransactions.map((tx) => (
                      <div key={tx.name} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-xs">
                          {tx.sign === "in" ? "↓" : "↑"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-charcoal-800">{tx.name}</p>
                          <p className="text-[10px] text-muted">{tx.detail}</p>
                        </div>
                        <p className={`text-xs font-semibold ${tx.sign === "in" ? "text-success" : "text-charcoal-800"}`}>{tx.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -left-3 bottom-6 rounded-xl border border-border bg-white px-3 py-2 shadow-lg">
                <p className="text-[10px] font-semibold text-charcoal-800">Payment completed</p>
                <p className="text-[10px] text-muted">KES 1,500 · Green Basket Shop</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-charcoal-800">What LinkPay does</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-muted">
            LinkPay is a proposed interoperable wallet network. Stellar provides blockchain settlement
            capabilities for supported assets, while the application backend manages identity, business logic,
            transaction workflows and records.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Individuals", d: "Pay other users, buy from merchants, receive money, view history and save trusted recipients." },
              { t: "Merchants", d: "Accept payments, issue payment requests, create invoices, pay suppliers and review sales." },
              { t: "Freelancers", d: "Request payment for work, receive earnings, issue invoices and pay collaborators." },
              { t: "Suppliers", d: "Receive payments, maintain customer records and settle workers and distributors." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-surface-2 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-lg font-semibold text-charcoal-800">{c.t}</h3>
                <p className="mt-2 text-sm text-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-charcoal-800">How the network works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Register & identify", d: "Sign up, verify email or phone, create a unique username and choose an account type." },
              { n: "02", t: "Discover", d: "Find participants by username or QR code and build trusted trading relationships." },
              { n: "03", t: "Transact", d: "Send, receive, request money and issue invoices with clear status and references." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-gold-600">{s.n}</p>
                <h3 className="mt-2 text-xl font-semibold text-charcoal-800">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
                <Link href="/how-it-works" className="mt-4 inline-block text-sm font-semibold text-gold-600 hover:text-gold-700">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-3xl font-bold text-charcoal-800">Trust, security and transparency</h2>
            <p className="mt-3 text-muted">
              Verify recipients before payment, apply transaction limits, protect accounts and provide a way to
              report suspicious activity. Financial records are clear, reference-linked and never silently
              rewritten.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-charcoal-700">
              <li>• Clear recipient identity before every payment</li>
              <li>• Transaction limits and account protection</li>
              <li>• Immutable references, audit trails and reporting</li>
              <li>• Strong contrast, keyboard navigation and clear errors</li>
            </ul>
            <Link href="/security" className="mt-5 inline-block text-sm font-semibold text-gold-600 hover:text-gold-700">Security details →</Link>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-charcoal-800">Statuses you can rely on</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Pending", "Completed", "Failed", "Cancelled", "Refunded"].map((s) => (
                <span key={s} className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-charcoal-700">
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              Status is communicated through clear text labels as well as color.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-charcoal-800">Roadmap and long-term vision</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: "Release 1 – MVP", d: "Prove the transaction network: registered participants pay one another, confirm receipt and inspect records." },
              { t: "Release 2 – Integrations", d: "Regulated fiat funding, mobile-money integrations and business APIs." },
              { t: "Scale", d: "Cross-border transactions, additional markets and a broader participant network." },
            ].map((r) => (
              <div key={r.t} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-charcoal-800">{r.t}</h3>
                <p className="mt-2 text-sm text-muted">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-charcoal-800 p-8 md:p-10">
            <h2 className="text-3xl font-bold text-white">Built with proven technology</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              Next.js for a responsive web application, Django REST Framework and PostgreSQL for identity,
              business logic and records, with Stellar blockchain integration for supported asset settlement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className="rounded-lg bg-gold-600 px-5 py-2.5 font-bold text-charcoal-900 hover:bg-gold-500">Create account</Link>
              <Link href="/login" className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-semibold text-white hover:bg-white/20">Log in</Link>
              <Link href="/business" className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-semibold text-white hover:bg-white/20">For business</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white py-8 text-center text-xs text-muted">
        LinkPay is a working name. Verify name, domain and trademark availability before committing.
        Test environment — balances are simulated, not real money.
      </footer>
    </div>
  );
}