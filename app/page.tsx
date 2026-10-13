import Link from "next/link";

export default function Home() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-emerald-700">LinkPay</h1>
      <p className="mt-4 text-lg text-slate-600">
        A connected wallet network for people and businesses.
      </p>
      <p className="mt-2 text-sm text-amber-700">
        Test environment: balances on this demo are simulated and labeled as test funds. Not real money.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/register" className="rounded bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700">Get started</Link>
        <Link href="/login" className="rounded border border-indigo-600 px-5 py-2 text-emerald-700 hover:bg-slate-50">Login</Link>
      </div>
      <div className="mt-12 grid gap-4 text-left md:grid-cols-2">
        {[
          "Individuals and customers",
          "Merchants and small businesses",
          "Freelancers and service providers",
          "Suppliers and business networks",
        ].map((g) => (
          <div key={g} className="rounded border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-800">{g}</h3>
            <p className="mt-1 text-sm text-slate-600">Transact, track payments and manage relationships in one place.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
