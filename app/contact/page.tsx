import { PageHero } from "@/components/sections/page-hero";

export const metadata = {
  title: "Contact",
  description: "Contact Ethioweb for projects, services, and partnerships.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Let us build your digital presence"
        subtitle="Tell us your goals and we will shape a practical plan."
      />

      <section className="container-wrap pb-16">
        <div className="card grid gap-6 p-7 md:grid-cols-2">
          <div>
            <h2 className="heading-display text-2xl font-black">Get in touch</h2>
            <p className="mt-3 text-[var(--muted)]">Email: hello@ethioweb.net</p>
            <p className="mt-1 text-[var(--muted)]">Location: Addis Ababa, Ethiopia</p>
          </div>

          <form className="space-y-3">
            <input className="w-full rounded-xl border border-[var(--line)] bg-white p-3" placeholder="Your name" />
            <input className="w-full rounded-xl border border-[var(--line)] bg-white p-3" placeholder="Email address" type="email" />
            <textarea className="h-32 w-full rounded-xl border border-[var(--line)] bg-white p-3" placeholder="Tell us about your project" />
            <button type="button" className="btn-primary">Send message</button>
          </form>
        </div>
      </section>
    </div>
  );
}
