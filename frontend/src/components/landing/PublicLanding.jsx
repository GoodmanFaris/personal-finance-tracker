"use client";

import Link from "next/link";
import { Button } from "@mui/material";

export default function PublicLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-y-0 left-0 w-[70%]"
          style={{ background: "rgb(var(--color-primary))" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[30%]"
          style={{ background: "rgb(var(--color-secondary))" }}
        />
        {/* subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Soft “wow” shapes (no boxes) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* glow left */}
        <div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-35"
          style={{ background: "rgb(var(--color-accent))" }}
        />
        {/* glow right */}
        <div className="absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full bg-white/25 blur-3xl opacity-40" />
        {/* thin gradient stripe */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/15" />
      </div>

      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6">
        <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* LEFT: Logo + Title + Copy + CTA */}
          <div className="max-w-xl">
            {/* Logo row */}
            <div className="flex items-center gap-3">
              {/* logo placeholder */}
              <div
                className="h-12 w-12 rounded-2xl border border-white/25 bg-white/15 backdrop-blur grid place-items-center"
                aria-label="Logo placeholder"
              >
                <span className="text-white font-black tracking-tight">BF</span>
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

            <h1 className="mt-8 text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
              Track money,
              <span className="block text-white/90">stay in control.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/80">
              BudgetFlo is a free, online, open-source personal finance tracker.
              Log income, manage expenses, and see clear monthly insights —
              without clutter.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                component={Link}
                href="/register"
                variant="contained"
                disableElevation
                sx={{
                  textTransform: "none",
                  fontWeight: 900,
                  borderRadius: 3,
                  px: 3.2,
                  py: 1.4,
                  bgcolor: "rgba(255,255,255,0.95)",
                  color: "rgb(var(--color-primary))",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.88)" },
                }}
              >
                Get Started
              </Button>

              <Button
                component={Link}
                href="/login"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 900,
                  borderRadius: 3,
                  px: 3.2,
                  py: 1.4,
                  borderColor: "rgba(255,255,255,0.55)",
                  color: "rgba(255,255,255,0.95)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.75)" },
                }}
              >
                Sign In
              </Button>
            </div>

            {/* tiny trust line */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                No ads
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                Minimal UI
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                Open-source
              </span>
            </div>
          </div>

          {/* RIGHT: Abstract premium graphic (no cards/boxes) */}
          <div className="relative hidden md:block">
            {/* thin ring */}
            <div className="absolute right-8 top-10 h-[420px] w-[420px] rounded-full border border-white/20" />
            <div className="absolute right-24 top-24 h-[300px] w-[300px] rounded-full border border-white/15" />

            {/* main gradient blob */}
            <div
              className="absolute right-6 top-14 h-[460px] w-[460px] rounded-full blur-2xl opacity-55"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.08) 55%, rgba(255,255,255,0) 70%)",
              }}
            />

            {/* subtle “signal” lines */}
            <div className="absolute right-0 top-0 h-full w-full">
              <div className="absolute right-10 top-32 h-px w-56 bg-white/20" />
              <div className="absolute right-14 top-44 h-px w-64 bg-white/15" />
              <div className="absolute right-20 top-56 h-px w-52 bg-white/10" />
            </div>

            {/* tiny accent dot */}
            <div
              className="absolute right-28 top-40 h-3 w-3 rounded-full shadow-sm"
              style={{ background: "rgb(var(--color-accent))" }}
            />

            {/* optional tagline on right (super minimal) */}
            <div className="absolute right-10 bottom-16 text-right">
              <p className="text-white/90 font-semibold">
                Simple. Clean. Fast.
              </p>
              <p className="text-white/65 text-sm">
                Your finances, in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />
    </main>
  );
}
