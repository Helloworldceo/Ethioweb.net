export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="container-wrap py-14">
      <article className="card max-w-4xl p-8">
        <h1 className="heading-display text-4xl font-black">Privacy Policy</h1>
        <p className="mt-4 leading-8 text-[var(--muted)]">
          Ethioweb gives users full control over profile visibility. Users can mark profile sections,
          documents, and links as public or private at any time from their dashboard.
        </p>
        <p className="mt-4 leading-8 text-[var(--muted)]">
          We only process data required to provide authentication, profile hosting, uploads, and
          account management features. Sensitive data is protected through secure storage and access
          controls.
        </p>
      </article>
    </section>
  );
}
