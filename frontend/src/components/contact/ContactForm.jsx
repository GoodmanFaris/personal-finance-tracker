"use client";

import useContactForm from "../../hooks/ContactForm";

const SUBJECT_OPTIONS = [
  { value: "question", label: "Question" },
  { value: "suggestion", label: "Suggestion" },
  { value: "bug", label: "Bug Report" },
  { value: "feedback", label: "General Feedback" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const { loading, msg, sendMessage } = useContactForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const subject = formData.get("subject");
    const message = formData.get("message");

    const ok = await sendMessage({ subject, message });
    if (ok) event.target.reset();
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 md:py-10">
      <div className="relative mx-auto w-full max-w-2xl">
        {/* soft glow behind */}
        <div
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.65), rgba(255,255,255,0) 55%)",
          }}
        />

        <div
          className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:p-8"
          style={{
            boxShadow: "0 24px 70px rgba(var(--color-shadow), 0.12)",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "rgb(var(--color-secondary))" }}
                />
                <h2
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: "rgb(var(--color-text-dark))" }}
                >
                  Contact us
                </h2>
              </div>
              <p className="mt-2 text-sm sm:text-base text-black/60">
                Send us your message and we&apos;ll get back to you.
              </p>
            </div>

            {/* tiny badge */}
            <div
              className="hidden sm:inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: "rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.6)",
                color: "rgb(var(--color-text-dark))",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgb(var(--color-primary))" }}
              />
              Support
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-black/70">
                Subject
              </label>
              <select
                name="subject"
                defaultValue="question"
                className="mt-2 block w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black/20 focus:bg-white"
              >
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-black/45">
                Choose the closest topic so we can respond faster.
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-black/70">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                placeholder="Write your message here..."
                className="mt-2 block w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-black/35 focus:border-black/20 focus:bg-white"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl px-4 py-3 text-sm font-extrabold text-white transition disabled:opacity-50"
              style={{
                background:
                  "rgb(var(--color-secondary))",
                boxShadow: "0 18px 45px rgba(0,0,0,0.14)",
              }}
            >
              {/* hover shine */}
              <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-white/20 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-[180%]" />
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>

          {/* Message feedback */}
          {msg ? (
            <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/70">
              {msg}
            </div>
          ) : null}

          {/* Footer hint */}
          <div className="mt-6 flex items-center justify-between text-xs text-black/45">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "rgb(var(--color-secondary))" }}
              />
              We usually reply within 24–48h
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "rgb(var(--color-primary))" }}
              />
              Open-source project
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
