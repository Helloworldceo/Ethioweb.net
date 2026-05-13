import { NextResponse } from "next/server";

const templates = [
  {
    id: "consultant-proof",
    name: "Consultant Proof",
    description: "Best for consultants and freelancers with case-study driven outcomes.",
    sections: ["Hero", "Services", "Case Studies", "Client Results", "Contact"],
  },
  {
    id: "creative-showcase",
    name: "Creative Showcase",
    description: "Best for designers and creators focused on visual projects.",
    sections: ["Hero", "Featured Work", "Process", "Testimonials", "Contact"],
  },
  {
    id: "engineering-portfolio",
    name: "Engineering Portfolio",
    description: "Best for developers with technical depth and product delivery.",
    sections: ["Profile", "Projects", "Tech Stack", "Performance Wins", "Contact"],
  },
];

export async function GET() {
  return NextResponse.json({ items: templates });
}
