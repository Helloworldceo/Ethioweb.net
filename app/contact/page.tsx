import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";

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
            <p className="mt-3 text-[var(--muted)]">Email: helloworldceo@1gmail.com</p>
            <p className="mt-1 text-[var(--muted)]">
              Portfolio:{" "}
              <a href="https://helloworldceo.github.io/" className="font-semibold text-[var(--brand)]" target="_blank" rel="noreferrer">
                https://helloworldceo.github.io/
              </a>
            </p>
            <p className="mt-1 text-[var(--muted)]">Location: Addis Ababa, Ethiopia</p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
