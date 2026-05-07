export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <section className="container-wrap py-14">
      <article className="card max-w-4xl p-8">
        <h1 className="heading-display text-4xl font-black">Terms of Service</h1>
        <p className="mt-4 leading-8 text-[var(--muted)]">
          Ethioweb provides digital profile management, content publishing, and service-oriented web
          platform features. By using Ethioweb, users agree to provide lawful content and keep account
          credentials secure.
        </p>
        <p className="mt-4 leading-8 text-[var(--muted)]">
          Uploaded documents remain the responsibility of the account owner. Ethioweb may remove
          content that violates law, policy, or platform integrity standards.
        </p>
      </article>
    </section>
  );
}
