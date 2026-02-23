"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background split (mobile: primary only) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-y-0 left-0 w-full md:w-[84%]"
          style={{ background: "rgb(var(--color-primary))" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-0 md:w-[16%]"
          style={{ background: "rgb(var(--color-secondary))" }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-35"
          style={{ background: "rgb(var(--color-accent))" }}
        />
        <div className="absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full bg-white/20 blur-3xl opacity-35" />
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              {/* Logo slot */}
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                <Image
                  src="/logo.png"
                  alt="BudgetFlo Logo"
                  fill
                  sizes="56px"
                  style={{ objectFit: "contain", padding: "6px" }}
                  priority
                />
              </div>

              <div className="leading-tight">
                <p className="text-white/90 text-sm font-semibold tracking-wide">
                  BudgetFlo
                </p>
                <p className="text-white/65 text-xs">
                  Open-source finance tracker
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              About BudgetFlo
              <span className="block text-white/85">simple money clarity.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/80">
              BudgetFlo is a{" "}
              <span className="font-semibold text-white">free</span>,{" "}
              <span className="font-semibold text-white">open-source</span>{" "}
              personal finance tracker built to help you stay in control of your
              spending.
            </p>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/80">
              Most people spend money without realizing where it goes. When you
              track income and expenses consistently, you gain a clear view of
              your habits — and it becomes much easier to plan, save, and make
              smarter decisions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-2xl bg-white/95 px-5 py-3 text-sm font-extrabold"
                style={{ color: "rgb(var(--color-primary))" }}
              >
                Go to Dashboard
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/45 px-5 py-3 text-sm font-extrabold text-white hover:border-white/70 transition"
              >
                Contact
              </Link>

              <a
                href="https://github.com/GoodmanFaris/personal-finance-tracker" target="_blank"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
              >
                GitHub (repo)
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                Version: v1
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                Free & minimal
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                Built for speed
              </span>
            </div>
          </div>

          {/* Right column cards */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
              <h2 className="text-white text-lg font-extrabold">
                What you can do
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>• Add income and expenses fast</li>
                <li>• Organize spending by categories</li>
                <li>• See monthly summaries and trends</li>
                <li>• Understand where your money really goes</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-white text-lg font-extrabold">Roadmap</h2>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                This is{" "}
                <span className="font-semibold text-white">version v1</span>.
                Later versions will include more personalization options,
                improved insights, and{" "}
                <span className="font-semibold text-white">AI-powered</span>{" "}
                features (e.g., smarter categorization, spending predictions,
                and recommendations).
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-white text-lg font-extrabold">Creator</h2>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Built by{" "}
                <span className="font-semibold text-white">Faris Lindov</span>{" "}
                (Bachelor of Computer Science). BudgetFlo is open-source and
                made to be clean, practical, and easy to extend.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-white font-extrabold">Privacy-first</p>
            <p className="mt-2 text-sm text-white/75">
              Designed to stay lightweight and respectful — no clutter, no
              nonsense.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-white font-extrabold">Open-source</p>
            <p className="mt-2 text-sm text-white/75">
              Community-friendly and transparent. Improve it, fork it, ship your
              own ideas.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-white font-extrabold">Built to scale</p>
            <p className="mt-2 text-sm text-white/75">
              Clean foundation now — smarter features later (AI, automation,
              deeper analytics).
            </p>
          </div>
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />
    </main>
  );
}
