import { BriefcaseBusiness, FileText, Scale, Search, Users } from "lucide-react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

const items = [
  {
    title: "Mr. Abhimanyu Mahajan",
    subtitle: "Legal Intern",
    description: "Drafted and reviewed legal documents, researched statutes and precedents, supported case preparation, and maintained case briefs.",
    icon: <FileText className="h-5 w-5 text-amber-700" />,
  },
  {
    title: "Adv. Manik Goyal / Nyayasarthak",
    subtitle: "Legal Intern · Pro Bono",
    description: "Prepared plaints, written statements, affidavits, and legal notices while improving drafting precision and procedural understanding.",
    icon: <Scale className="h-5 w-5 text-amber-600" />,
  },
  {
    title: "DGS Associates",
    subtitle: "Legal Intern",
    description: "Assisted in client meetings, observed requirement gathering, and contributed to tailored legal support based on real-world needs.",
    icon: <Users className="h-5 w-5 text-stone-600" />,
  },
  {
    title: "SMCEC",
    subtitle: "Editorial Board Member / Legal Exposure",
    description: "Built stronger understanding of ESG, environmental law, climate change, and sustainability-related legal issues.",
    icon: <Search className="h-5 w-5 text-slate-600" />,
  },
  {
    title: "Shri Mohit Kumar Prasad",
    subtitle: "Legal Intern · Senior Civil Judge",
    description: "Assisted in legal research, assignments, draft notes, and analytical work with valuable exposure to judicial functioning.",
    icon: <BriefcaseBusiness className="h-5 w-5 text-amber-600" />,
  },
];

export default function FeaturedJourney() {
  return (
    <section className="bg-[var(--portfolio-surface)]">
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--portfolio-muted)]">
              Featured Experience
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--portfolio-text)] md:text-6xl">
              Priyal’s legal journey,
              <br />
              <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                presented with motion
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--portfolio-muted)] md:text-base">
              A polished snapshot of internships, legal drafting work, research exposure, client interaction, and court-oriented learning.
            </p>
          </div>
        }
      >
        <div className="relative h-full w-full bg-gradient-to-br from-[#fffdf7] via-white to-[#f8f4ea] p-5 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.10),transparent_28%)]" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--portfolio-border)] pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--portfolio-muted)]">
                  LinkedIn Style Overview
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--portfolio-text)] md:text-3xl">
                  Internship Highlights
                </h3>
              </div>
            </div>

            <div className="grid flex-1 gap-4 overflow-hidden md:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => (
                <div key={index} className="rounded-3xl border border-[var(--portfolio-border)] bg-white/90 p-5 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--portfolio-surface)]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[var(--portfolio-text)]">{item.title}</h4>
                      <p className="text-sm text-[var(--portfolio-muted)]">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="mb-4 h-px w-full bg-gradient-to-r from-amber-400 via-amber-300 to-transparent opacity-70" />
                  <p className="text-sm leading-7 text-[var(--portfolio-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
