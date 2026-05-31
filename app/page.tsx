const features = [
  {
    title: "Inventory tracking",
    description:
      "Monitor stock levels, set low-stock alerts, and track ingredients across every product line in real time.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "Order management",
    description:
      "Accept walk-in, phone, and online orders from one dashboard. Never miss a custom cake request again.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    title: "Sales analytics",
    description:
      "Spot your best sellers, peak hours, and seasonal trends with clear reports built for confectionery businesses.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Staff scheduling",
    description:
      "Plan shifts, assign roles, and keep your front counter and kitchen running smoothly every day.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Customer profiles",
    description:
      "Remember preferences, allergies, and loyalty rewards so every regular feels like your only customer.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Multi-location support",
    description:
      "Manage one shop or an entire chain from a single account with location-specific inventory and pricing.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    stat: "40%",
    label: "Less time on admin",
    description: "Automate repetitive tasks so your team can focus on crafting and serving customers.",
  },
  {
    stat: "2×",
    label: "Faster order fulfillment",
    description: "Streamlined workflows from order intake to pickup keep lines moving and customers happy.",
  },
  {
    stat: "99.9%",
    label: "Platform uptime",
    description: "Reliable cloud infrastructure means your shop keeps running, even during peak holiday rushes.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-sm">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.2 4.2 2.5 5.5C7 15 5 17 5 19.5 5 21.4 6.6 23 8.5 23h7c1.9 0 3.5-1.6 3.5-3.5 0-2.5-2-4.5-3.5-5.5C16.8 12.2 18 10.5 18 8c0-3.5-2.5-6-6-6zm0 2c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.5-.4.2-.6.7-.4 1.1.5 1.2 1.4 2.4 2.4 3.4H8c1-1 1.9-2.2 2.4-3.4.2-.4 0-.9-.4-1.1-1.2-.7-2-2-2-3.5 0-2.2 1.8-4 4-4z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Sweet<span className="text-rose-600">Desk</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-600">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-600">
              Benefits
            </a>
            <a
              href="/dashboard"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Get started
            </a>
          </div>
          <a
            href="/dashboard"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:hidden"
          >
            Get started
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-white to-white px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-1.5 text-sm font-medium text-rose-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Built for sweet shops &amp; bakeries
              </span>
              <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Run your sweet shop with{" "}
                <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                  less chaos
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
                SweetDesk brings inventory, orders, staff, and customer insights into one
                platform — so you spend less time on spreadsheets and more time creating
                treats people love.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/dashboard"
                  className="w-full rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-8 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:from-rose-700 hover:to-rose-600 sm:w-auto"
                >
                  Start free trial
                </a>
                <a
                  href="#features"
                  className="w-full rounded-full border border-slate-300 bg-white px-8 py-3.5 text-center text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                No credit card required · 14-day free trial · Cancel anytime
              </p>
            </div>

            {/* Hero preview card */}
            <div className="mx-auto mt-16 max-w-4xl">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-medium text-slate-400">SweetDesk Dashboard</span>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-3">
                  <div className="rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 p-5 text-white">
                    <p className="text-sm font-medium text-rose-100">Today&apos;s revenue</p>
                    <p className="mt-1 text-3xl font-bold">$2,847</p>
                    <p className="mt-2 text-sm text-rose-100">↑ 18% vs yesterday</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Orders pending</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">24</p>
                    <p className="mt-2 text-sm text-amber-600">6 custom cakes due today</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Low stock items</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">3</p>
                    <p className="mt-2 text-sm text-rose-600">Vanilla extract, fondant, sprinkles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-white px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-600">
                Features
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything your shop needs, in one place
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From the display case to the back kitchen, SweetDesk keeps every part of
                your business connected and organized.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-rose-200 hover:shadow-lg hover:shadow-rose-500/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                    {feature.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="bg-slate-900 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-400">
                  Benefits
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Spend more time on what you love — making sweets
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-400">
                  Shop owners using SweetDesk report smoother operations, happier staff, and
                  customers who keep coming back. Less paperwork, more passion.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Reduce waste with smart inventory forecasting",
                    "Cut order errors with clear production queues",
                    "Grow repeat business with built-in loyalty tools",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-300">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 text-center lg:text-left xl:text-center"
                  >
                    <p className="text-4xl font-bold text-white">{benefit.stat}</p>
                    <p className="mt-2 font-semibold text-rose-400">{benefit.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 px-8 py-16 text-center shadow-2xl shadow-rose-500/30 sm:px-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to sweeten your operations?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-rose-100">
                  Join sweet shop owners who are simplifying their daily workflow with
                  SweetDesk. Start your free trial today.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href="/dashboard"
                    className="w-full rounded-full bg-white px-8 py-3.5 text-base font-semibold text-rose-600 transition-colors hover:bg-rose-50 sm:w-auto"
                  >
                    Start free trial
                  </a>
                  <a
                    href="/dashboard"
                    className="w-full rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10 sm:w-auto"
                  >
                    Book a demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 text-white">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.2 4.2 2.5 5.5C7 15 5 17 5 19.5 5 21.4 6.6 23 8.5 23h7c1.9 0 3.5-1.6 3.5-3.5 0-2.5-2-4.5-3.5-5.5C16.8 12.2 18 10.5 18 8c0-3.5-2.5-6-6-6zm0 2c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.5-.4.2-.6.7-.4 1.1.5 1.2 1.4 2.4 2.4 3.4H8c1-1 1.9-2.2 2.4-3.4.2-.4 0-.9-.4-1.1-1.2-.7-2-2-2-3.5 0-2.2 1.8-4 4-4z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">
              Sweet<span className="text-rose-600">Desk</span>
            </span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SweetDesk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
