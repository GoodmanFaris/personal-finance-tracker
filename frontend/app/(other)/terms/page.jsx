export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6" style={{ color: "rgb(var(--color-text-reverse2))"}}>
        Terms of Service
      </h1>

      <p className="mb-4 text-sm " style={{ color: "rgb(var(--color-text-reverse))"}}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 text-sm leading-relaxed " style={{ color: "rgb(var(--color-text-reverse))"}}>
        <p>
          By accessing or using BudgetFlo, you agree to these Terms of Service.
          If you do not agree, please do not use the service.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Use of Service</h2>
        <p>
          BudgetFlo is a free and open-source personal finance tracker. You are
          responsible for maintaining the security of your account and for all
          activity that occurs under your account.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>No Financial Advice</h2>
        <p>
          BudgetFlo does not provide financial, investment, legal, or tax
          advice. The information provided by the service is for informational
          purposes only.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Limitation of Liability</h2>
        <p>
          The service is provided "as is" without warranties of any kind. The
          creator shall not be held liable for any loss, damages, or financial
          decisions made based on the use of this service.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Changes</h2>
        <p>
          These terms may be updated from time to time. Continued use of the
          service after changes means you accept the updated terms.
        </p>

        <h2 className="font-semibold " style={{ color: "rgb(var(--color-text-reverse2))"}}>Contact</h2>
        <p>
          For any questions regarding these Terms, please contact us via the
          contact page.
        </p>
      </section>
    </main>
  );
}
