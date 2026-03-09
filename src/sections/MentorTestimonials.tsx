import {
  TestimonialsMinimal,
  type MinimalTestimonialItem,
} from "@/components/ui/minimal-testimonial";
import { BadgeCheck, ShieldCheck, Star } from "lucide-react";

type VerifiedMentor = MinimalTestimonialItem & {
  verification: string;
  context: string;
};

const mentorTestimonials: VerifiedMentor[] = [
  {
    quote:
      "Priyal shows consistency, discipline, and a strong legal drafting mindset. She learns quickly and applies feedback effectively.",
    name: "Mr. Abhimanyu Mahajan",
    role: "Advocate · Internship Mentor",
    verification: "Verified internship supervisor",
    context: "Legal research and drafting supervision",
    image:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=900&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "Her commitment during internship tasks stood out. She approached documentation with seriousness and professional clarity.",
    name: "Adv. Manik Goyal",
    role: "Nyayasarthak · Pro Bono Mentor",
    verification: "Verified pro bono mentor",
    context: "Procedural drafting and documentation feedback",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=900&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "Priyal handled assignments with focus and maturity. She is dependable and brings clear analytical thinking to legal work.",
    name: "Team at DGS Associates",
    role: "Litigation Practice Mentors",
    verification: "Verified internship team review",
    context: "Client-facing support and legal workflow",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "She demonstrated sincere effort in legal research and note preparation, and showed a strong willingness to improve.",
    name: "Shri Mohit Kumar Prasad",
    role: "Senior Civil Judge · Internship Guidance",
    verification: "Verified judicial internship guidance",
    context: "Assignment review and legal reasoning feedback",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&auto=format&fit=crop&q=60",
  },
];

export default function MentorTestimonials() {
  return (
    <section className="bg-[var(--portfolio-bg)] px-4 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--portfolio-muted)]">
              Mentor Feedback
            </p>
            <h2
              className="text-4xl font-semibold tracking-tight text-[var(--portfolio-text)] md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Verified internship references
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--portfolio-muted)] md:text-base">
              A trusted snapshot of how mentors describe Priyal's professionalism, legal clarity,
              and execution quality across internships.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-muted)]">
              Validation Summary
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[var(--portfolio-surface)] px-3 py-2">
                <p className="text-xs text-[var(--portfolio-muted)]">Mentors</p>
                <p className="text-lg font-semibold text-[var(--portfolio-text)]">4</p>
              </div>
              <div className="rounded-xl bg-[var(--portfolio-surface)] px-3 py-2">
                <p className="text-xs text-[var(--portfolio-muted)]">Domains</p>
                <p className="text-lg font-semibold text-[var(--portfolio-text)]">Litigation</p>
              </div>
              <div className="rounded-xl bg-[var(--portfolio-surface)] px-3 py-2">
                <p className="text-xs text-[var(--portfolio-muted)]">Theme</p>
                <p className="text-lg font-semibold text-[var(--portfolio-text)]">Reliability</p>
              </div>
            </div>
          </div>
        </div>

        <TestimonialsMinimal testimonials={mentorTestimonials} />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {mentorTestimonials.map((mentor) => (
            <article
              key={`${mentor.name}-${mentor.context}`}
              className="rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
                <ShieldCheck className="h-4 w-4 text-[var(--portfolio-muted)]" />
              </div>

              <p className="text-sm font-semibold text-[var(--portfolio-text)]">{mentor.name}</p>
              <p className="mt-1 text-xs text-[var(--portfolio-muted)]">{mentor.role}</p>

              <div className="mt-3 rounded-xl border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--portfolio-muted)]">
                  Feedback Context
                </p>
                <p className="mt-1 text-sm text-[var(--portfolio-text)]">{mentor.context}</p>
              </div>

              <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--portfolio-muted)]">
                <Star className="h-3.5 w-3.5 text-pink-500" />
                {mentor.verification}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
