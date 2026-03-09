import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  FileText,
  Gavel,
  GraduationCap,
  Leaf,
  Scale,
  ShieldCheck,
  Trophy,
  Users2,
} from "lucide-react";

type InternshipItem = {
  org: string;
  role: string;
  focus: string;
  summary: string;
  highlights: string[];
  icon: LucideIcon;
};

type CampusRole = {
  title: string;
  engagement: string;
  period: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
};

const internships: InternshipItem[] = [
  {
    org: "Shri Mohit Kumar Prasad",
    role: "Legal Intern",
    focus: "Judicial Perspective",
    summary:
      "Developed better legal reasoning and courtroom understanding through assignment-based judicial exposure.",
    highlights: [
      "Assisted with legal research assignments",
      "Worked on concise draft notes and analysis",
      "Observed courtroom process and judicial workflow",
    ],
    icon: Gavel,
  },
  {
    org: "Mr. Abhimanyu Mahajan",
    role: "Legal Intern",
    focus: "Research & Drafting",
    summary:
      "Built foundational rigor in legal research, note preparation, and drafting workflow for active legal matters.",
    highlights: [
      "Prepared research briefs from statutes and precedents",
      "Assisted with draft structuring for legal documents",
      "Supported case-file organization and hearing notes",
    ],
    icon: FileText,
  },
  {
    org: "Adv. Manik Goyal / Nyayasarthak",
    role: "Pro Bono Legal Intern",
    focus: "Procedural Documentation",
    summary:
      "Gained hands-on drafting discipline by preparing procedural documents for practical legal use.",
    highlights: [
      "Drafted affidavits, plaints, and written statements",
      "Prepared legal notices with stronger precision",
      "Improved understanding of court filing format",
    ],
    icon: Scale,
  },
  {
    org: "DGS Associates",
    role: "Legal Intern",
    focus: "Client-Oriented Exposure",
    summary:
      "Observed legal service delivery from consultation to strategy, helping bridge law-school learning with real client context.",
    highlights: [
      "Joined client discussions and requirement mapping",
      "Learned practical framing of legal advice",
      "Supported basic research and follow-up notes",
    ],
    icon: Users2,
  },
  {
    org: "SMCEC ESG Centre",
    role: "Editorial Board / Legal Exposure",
    focus: "ESG & Sustainability Law",
    summary:
      "Expanded legal perspective through work touching environmental regulation, policy dialogue, and sustainability issues.",
    highlights: [
      "Explored ESG and climate-linked legal themes",
      "Contributed to environmental-law learning material",
      "Strengthened interdisciplinary legal reading",
    ],
    icon: BriefcaseBusiness,
  },
];

const sgtRoles: CampusRole[] = [
  {
    title: "Law Student",
    engagement: "Full-time",
    period: "Sep 2021 - Present · 4 yrs 7 mos",
    description:
      "Pursuing law at SGT University while consistently building foundations in legal analysis, research, drafting, and public communication.",
    skills: ["Research Skills", "Public Speaking", "Legal Research"],
    icon: GraduationCap,
  },
  {
    title: "President, Rashtriya Yuva Sansad, 2024",
    engagement: "Part-time",
    period: "Apr 2024 - Jun 2024 · 3 mos",
    description:
      "Led the event with responsibility and confidence, handled challenges, and grew through leadership-driven coordination.",
    skills: [
      "Leadership",
      "Event Management",
      "Public Speaking",
      "Public Relations",
      "Team Management",
      "Time Management",
    ],
    icon: Trophy,
  },
  {
    title: "Volunteer, SYNERGY (Inter-University Tecno Fest)'24",
    engagement: "Part-time",
    period: "Sep 2024 - Oct 2024 · 2 mos",
    description:
      "Contributed to awareness sessions on digital arrest scams by explaining warning signs, real examples, and practical next steps.",
    skills: [
      "Social Awareness",
      "Legal Research",
      "Public Speaking",
      "Public Administration",
      "Security Awareness",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Convenor, International Trial Advocacy Competition, 2025",
    engagement: "Part-time",
    period: "Dec 2024 - Mar 2025 · 4 mos",
    description:
      "Handled event responsibilities, team coordination, and challenge management while strengthening confidence and leadership execution.",
    skills: [
      "Communication",
      "Event Management",
      "Public Relations",
      "Public Speaking",
      "Digital Marketing",
      "Leadership Development",
    ],
    icon: Users2,
  },
  {
    title: "Member, SMCEC (ESG, Environmental Law & Climate Change)",
    engagement: "Part-time",
    period: "Mar 2025 - Present · 1 yr 1 mo",
    description:
      "As an editorial board member, contributes to strengthening awareness around sustainability, environmental protection, and ESG understanding.",
    skills: [
      "Environmental Awareness",
      "Climate Change",
      "Environmental Compliance",
      "ESG",
      "Social Awareness",
    ],
    icon: Leaf,
  },
];

export default function InternshipTimeline() {
  return (
    <section id="internships" className="bg-[var(--portfolio-bg)] px-4 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--portfolio-muted)]">
            Experience Timeline
          </p>
          <h2
            className="text-4xl font-semibold tracking-tight text-[var(--portfolio-text)] md:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Professional exposure and university leadership
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--portfolio-muted)] md:text-base">
            A combined view of Priyal’s legal internship work and her high-impact roles at SGT
            University, presented as a structured growth journey.
          </p>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-2">
          <div className="rounded-[30px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] md:p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[var(--portfolio-text)] md:text-3xl">
                Legal Internship Exposure
              </h3>
              <p className="mt-2 text-sm text-[var(--portfolio-muted)]">
                Hands-on learning across drafting, research, client-facing work, and judicial
                observation.
              </p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--portfolio-accent)] via-pink-400/60 to-[var(--portfolio-border)]" />
              <div className="space-y-6">
                {internships.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.org}
                      className="relative rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5"
                    >
                      <span className="absolute -left-[2.05rem] top-7 flex h-7 w-7 items-center justify-center rounded-full border border-pink-300 bg-white text-[11px] font-semibold text-[var(--portfolio-accent)]">
                        {index + 1}
                      </span>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-xl border border-[var(--portfolio-border)] bg-white p-2">
                          <Icon className="h-4 w-4 text-[var(--portfolio-muted)]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--portfolio-muted)]">
                            {item.focus}
                          </p>
                          <h4 className="mt-1 text-lg font-semibold text-[var(--portfolio-text)]">{item.org}</h4>
                          <p className="mt-1 text-sm font-medium text-[var(--portfolio-muted)]">{item.role}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-[var(--portfolio-muted)]">{item.summary}</p>

                      <div className="mt-4 grid gap-2 md:grid-cols-2">
                        {item.highlights.map((line) => (
                          <div
                            key={line}
                            className="rounded-xl border border-[var(--portfolio-border)] bg-white px-3 py-2 text-sm text-[var(--portfolio-muted)]"
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.06)] md:p-8">
            <div className="mb-8 rounded-2xl border border-pink-200 bg-pink-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-accent)]">
                SGT University
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-[var(--portfolio-text)] md:text-3xl">
                4 yrs 7 mos of leadership and contribution
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--portfolio-muted)]">
                Campus roles covering advocacy events, sustainability awareness, public-facing
                initiatives, and student leadership.
              </p>
            </div>

            <div className="space-y-4">
              {sgtRoles.map((role) => {
                const Icon = role.icon;

                return (
                  <article
                    key={role.title}
                    className="rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-xl border border-[var(--portfolio-border)] bg-white p-2">
                        <Icon className="h-4 w-4 text-[var(--portfolio-muted)]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-semibold text-[var(--portfolio-text)]">{role.title}</h4>
                          <span className="rounded-full border border-[var(--portfolio-border)] bg-white px-2 py-0.5 text-[11px] font-medium text-[var(--portfolio-muted)]">
                            {role.engagement}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-muted)]">
                          {role.period}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">{role.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[var(--portfolio-border)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--portfolio-muted)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
