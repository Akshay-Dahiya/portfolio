import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, BookText, FileSearch, Gavel, Scale, Users2 } from "lucide-react";

type CaseStudy = {
  title: string;
  context: string;
  challenge: string;
  contribution: string;
  outcome: string;
  skills: string[];
  icon: LucideIcon;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Judicial Research Support",
    context: "Internship under Shri Mohit Kumar Prasad",
    challenge:
      "Understand courtroom workflow quickly while preparing legally sound and concise research notes.",
    contribution:
      "Prepared focused legal research inputs, draft observations, and issue summaries for assignment-driven matters.",
    outcome:
      "Built stronger legal reasoning, sharper brief-writing discipline, and practical court-process understanding.",
    skills: ["Legal Research", "Case Analysis", "Court Observation"],
    icon: Gavel,
  },
  {
    title: "Procedural Drafting for Pro Bono Matters",
    context: "Adv. Manik Goyal / Nyayasarthak",
    challenge:
      "Draft procedural legal documents with precision while adapting to real filing and litigation expectations.",
    contribution:
      "Worked on affidavits, plaints, written statements, and notices with close attention to legal structure.",
    outcome:
      "Improved drafting quality and confidence in practical legal documentation standards.",
    skills: ["Legal Drafting", "Procedural Law", "Document Review"],
    icon: Scale,
  },
  {
    title: "Client-Facing Legal Support",
    context: "DGS Associates",
    challenge:
      "Translate client requirements into actionable legal support while maintaining clarity and professionalism.",
    contribution:
      "Observed consultations, supported requirement mapping, and prepared concise follow-up notes for matter tracking.",
    outcome:
      "Developed practical understanding of legal service delivery in client-centered environments.",
    skills: ["Client Communication", "Issue Framing", "Professional Writing"],
    icon: Users2,
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-[var(--portfolio-bg)] px-4 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--portfolio-muted)]">
              Legal Case Studies
            </p>
            <h2
              className="text-4xl font-semibold tracking-tight text-[var(--portfolio-text)] md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Work beyond titles
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--portfolio-muted)] md:text-base">
              A case-study view of Priyal's internship experience, showing practical legal problems,
              contribution style, and professional outcomes.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-[var(--portfolio-muted)]">
              <BookText className="h-4 w-4" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Snapshot</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[var(--portfolio-surface)] px-3 py-2">
                <p className="text-xs text-[var(--portfolio-muted)]">Case Studies</p>
                <p className="text-lg font-semibold text-[var(--portfolio-text)]">3</p>
              </div>
              <div className="rounded-xl bg-[var(--portfolio-surface)] px-3 py-2">
                <p className="text-xs text-[var(--portfolio-muted)]">Primary Track</p>
                <p className="text-lg font-semibold text-[var(--portfolio-text)]">Litigation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;

            return (
              <article
                key={study.title}
                className="group rounded-[28px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.1)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] px-3 py-1.5">
                    <Icon className="h-3.5 w-3.5 text-[var(--portfolio-accent)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--portfolio-muted)]">
                      Case {index + 1}
                    </span>
                  </div>
                  <FileSearch className="h-4 w-4 text-[var(--portfolio-muted)]" />
                </div>

                <h3 className="text-xl font-semibold text-[var(--portfolio-text)]">{study.title}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--portfolio-muted)]">{study.context}</p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-muted)]">
                      Challenge
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--portfolio-text)]">{study.challenge}</p>
                  </div>
                  <div className="rounded-xl border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-muted)]">
                      Contribution
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--portfolio-text)]">{study.contribution}</p>
                  </div>
                  <div className="rounded-xl border border-pink-200 bg-pink-50/70 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-accent)]">
                      Outcome
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--portfolio-text)]">{study.outcome}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {study.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[var(--portfolio-border)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--portfolio-muted)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href="#internships"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--portfolio-text)] transition hover:text-[var(--portfolio-accent)]"
                >
                  See full timeline
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
