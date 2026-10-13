import Link from "next/link";

export default function Home() {
  return (
    <div className="-mx-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-none">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/55" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_45%)]" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Test environment · Simulated balances
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            A connected wallet network for people and businesses
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Send, receive, request, and track payments in one place. Built for merchants,
            freelancers, suppliers, and their customers across Kenya and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-400">
              Get started free
            </Link>
            <Link href="/login" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20">
              Log in
            </Link>
          </div>
          <div className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              { k: "4", v: "User groups" },
              { k: "KES", v: "Multi-role wallets" },
              { k: "100%", v: "Transparent records" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">{s.k}</p>
                <p className="text-sm text-slate-300">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value propositions */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">Everything your money network needs</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            One platform to pay customers, suppliers, contractors and workers — with reliable records and clear status.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Individuals", d: "Pay other users, buy from merchants, receive money and save trusted recipients." },
              { t: "Merchants", d: "Accept payments, issue requests, create invoices and review sales in one place." },
              { t: "Freelancers", d: "Bill clients, receive earnings, and pay collaborators without leaving the app." },
              { t: "Suppliers", d: "Maintain customer records and settle repeat payments to workers and distributors." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-900">{c.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-slate-900">How LinkPay works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Register", d: "Sign up, verify your email or phone and choose your account type." },
              { n: "02", t: "Connect", d: "Find trusted recipients by username or QR and build your network." },
              { n: "03", t: "Transact", d: "Send, request and pay with clear status, references and receipts." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-indigo-600">{s.n}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Built for trust</h2>
            <p className="mt-3 text-slate-600">
              Verify recipients before you pay, apply transaction limits, protect accounts and report
              suspicious activity. Financial records are tamper-evident and never silently rewritten.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/register" className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">Create account</Link>
              <Link href="/login" className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">Log in</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <ul className="space-y-3 text-sm text-slate-700">
              <li>• Clear recipient identity before every payment</li>
              <li>• Transaction limits and account protection</li>
              <li>• Immutable transaction references and audit trail</li>
              <li>• Report suspicious users or transactions instantly</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
        LinkPay is a working name. Verify name, domain and trademark availability before committing.
        Test environment — balances are simulated, not real money.
      </footer>
    </div>
  );
}
