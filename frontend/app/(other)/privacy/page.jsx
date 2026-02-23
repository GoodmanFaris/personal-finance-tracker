export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6" style={{ color: "rgb(var(--color-text-reverse2))"}}>
        Privacy Policy
      </h1>

      <p className="mb-4 text-sm " style={{ color: "rgb(var(--color-text-reverse))"}}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 text-sm leading-relaxed " style={{ color: "rgb(var(--color-text-reverse))"}}>
        <p>
          BudgetFlo respects your privacy. This policy explains what data we
          collect and how it is used.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Information We Collect</h2>
        <p>
          We may collect your name, email address, and financial data (income,
          expenses, and categories) that you enter into the application.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>How We Use Information</h2>
        <p>
          Your data is used solely to provide and maintain the functionality of
          the service, including authentication and financial summaries.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Data Sharing</h2>
        <p>
          We do not sell or share your personal data with third parties. The
          service may use infrastructure providers for hosting and operation.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Security</h2>
        <p>
          Reasonable technical measures are implemented to protect your data.
          However, no online service can guarantee absolute security.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Your Rights</h2>
        <p>
          You may request deletion of your account and associated data at any
          time.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Contact</h2>
        <p>
          If you have any privacy-related questions, please contact us via the
          contact page.
        </p>
      </section>
    </main>
  );
}
