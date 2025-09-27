'use client'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import NextLink from 'next/link'

const featureItems = [
  {
    title: 'Live store pulse',
    description: 'Surface traffic, dwell, and conversion insights in one view.',
  },
  {
    title: 'Guided actions',
    description: 'Translate signals into ready-to-run playbooks for every team.',
  },
  {
    title: 'Seamless rollout',
    description: 'Deploy across locations quickly with secure, compliant defaults.',
  },
]

const partnerLogos = ['Foundry', 'Northwind', 'Atlas', 'Brightline', 'Solstice']

export function MarketingLanding() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0047AB]">
              <Logo className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">RetailX</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="hover:text-slate-900" href="#features">
              Features
            </a>
            <a className="hover:text-slate-900" href="#social-proof">
              Customers
            </a>
            <a className="hover:text-slate-900" href="#cta">
              Contact
            </a>
            <Button className="px-6 py-3 text-sm font-semibold shadow-none bg-[#0047AB] hover:bg-[#003a8c]">
              Book a demo
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="grid grid-cols-1 gap-12 py-24 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0047AB]">
              Retail intelligence
            </p>
            <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              Retail intelligence, rethought for speed
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">
              Unify video, sales, and staffing signals into a single, decisive command surface.
            </p>
            <div className="mt-12 flex flex-wrap gap-6">
              <Button className="px-6 py-3 text-base font-semibold bg-[#0047AB] hover:bg-[#003a8c]">
                Book a demo
              </Button>
              <NextLink
                className="flex items-center text-base font-semibold text-[#0047AB] hover:text-[#003a8c]"
                href="#features"
              >
                Explore features
              </NextLink>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 lg:col-span-7">
            <div className="relative mx-auto max-w-xl rounded-[32px] bg-gradient-to-br from-[#0047AB] via-[#1C64F2] to-[#8AB4F8] p-8 shadow-[0_32px_80px_rgba(0,71,171,0.25)]">
              <div className="rounded-3xl bg-white/90 p-10">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        Command view
                      </p>
                      <p className="mt-3 text-2xl font-semibold text-slate-900">
                        Morning floor briefing
                      </p>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                        <span>Queue outlook</span>
                        <span className="font-semibold text-[#0047AB]">Clear</span>
                      </li>
                      <li className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                        <span>Promo dwell</span>
                        <span className="font-semibold text-[#0047AB]">+18%</span>
                      </li>
                      <li className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                        <span>Staff coverage</span>
                        <span className="font-semibold text-[#0047AB]">Balanced</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-4 space-y-4">
                    <div className="rounded-3xl bg-slate-100 p-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Alerts
                    </div>
                    <div className="rounded-3xl bg-[#0047AB] p-4 text-sm font-semibold text-white shadow-lg">
                      Auto-reassign two associates to front
                    </div>
                    <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
                      Deploy curbside pickup prompt at 4pm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 py-16" id="features">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-semibold leading-tight">
                Operational clarity in every lane
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 lg:col-span-8">
              {featureItems.map((feature) => (
                <div
                  key={feature.title}
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-base text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 py-16" id="social-proof">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Trusted by modern retailers
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-10 md:grid-cols-5 lg:col-span-8">
              {partnerLogos.map((logo) => (
                <div
                  key={logo}
                  className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 py-20" id="cta">
          <div className="grid grid-cols-1 gap-12 rounded-[32px] bg-[#0047AB] px-10 py-16 text-white lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-semibold leading-tight">
                Ready to orchestrate every store day?
              </h2>
            </div>
            <div className="lg:col-span-4">
              <Button className="w-full px-6 py-3 text-base font-semibold text-[#0047AB] bg-white hover:bg-slate-100">
                Book a demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 text-sm text-slate-500">
          <span className="font-semibold text-slate-700">© {new Date().getFullYear()} RetailX</span>
          <div className="flex flex-wrap gap-6">
            <NextLink className="hover:text-slate-700" href="#">
              Privacy
            </NextLink>
            <NextLink className="hover:text-slate-700" href="#">
              Terms
            </NextLink>
            <NextLink className="hover:text-slate-700" href="#">
              Support
            </NextLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
