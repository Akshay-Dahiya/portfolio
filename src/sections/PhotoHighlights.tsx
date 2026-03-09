import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, BadgeCheck, Landmark, Mic2, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import announcement from "../assets/images/yuva-sansad-announcement.png";
import secretariat from "../assets/images/priyal-secretariat-board.png";
import lawGroup from "../assets/images/priyal-law-event-group.png";
import speaking from "../assets/images/hero-priyal-speaking.png";

type MomentItem = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  objectPosition: string;
  year: string;
  impact: string;
  icon: LucideIcon;
  notes: string[];
};

const moments: MomentItem[] = [
  {
    title: "President — Rashtriya Yuva Sansad 2024",
    subtitle: "National Youth Parliament",
    description:
      "Directed a national youth parliament at SGT University, facilitating policy dialogue alongside legislators, legal experts, and academic leadership.",
    image: announcement,
    objectPosition: "43% 16%",
    year: "2024",
    impact: "National Leadership Mandate",
    icon: Landmark,
    notes: [
      "Facilitated policy dialogue with institutional and legal leadership.",
      "Managed stage flow, moderation rhythm, and formal protocol.",
    ],
  },
  {
    title: "Secretariat Board Leadership",
    subtitle: "Institutional Coordination",
    description:
      "Led planning and execution responsibilities across student legal forums, with a strong focus on team coordination and delivery standards.",
    image: secretariat,
    objectPosition: "center",
    year: "2024",
    impact: "Execution & Governance",
    icon: Users2,
    notes: [
      "Directed planning workflows, timeline ownership, and team accountability.",
      "Balanced coordination quality with delivery speed under event pressure.",
    ],
  },
  {
    title: "Law Forum Participation",
    subtitle: "Academic Presence",
    description:
      "Regular participation in law-focused events strengthened her legal interpretation, collaboration, and confidence in structured discussion spaces.",
    image: lawGroup,
    objectPosition: "center",
    year: "2024-25",
    impact: "Legal Depth",
    icon: BadgeCheck,
    notes: [
      "Built stronger legal interpretation through repeated forum participation.",
      "Improved confidence in structured legal discourse and collaboration.",
    ],
  },
  {
    title: "Public Speaking & Advocacy",
    subtitle: "Communication",
    description:
      "Built a clear and persuasive speaking style through formal presentations, legal discussions, and public-facing engagements.",
    image: speaking,
    objectPosition: "center",
    year: "Ongoing",
    impact: "Public Voice",
    icon: Mic2,
    notes: [
      "Developed concise and persuasive communication in formal settings.",
      "Strengthened voice, clarity, and audience engagement in advocacy contexts.",
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};

export default function PhotoHighlights() {
  const [primaryMoment, ...secondaryMoments] = moments;
  const PrimaryIcon = primaryMoment.icon;

  return (
    <section
      id="highlights"
      className="relative overflow-hidden bg-[var(--portfolio-surface)] px-4 py-24 md:px-8 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(180,83,9,0.09),transparent_42%),radial-gradient(circle_at_100%_80%,rgba(107,114,128,0.10),transparent_36%)]" />
      <div className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(90deg,transparent,transparent_55px,rgba(148,163,184,0.07)_56px)]" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        className="relative mx-auto max-w-7xl"
      >
        <motion.div variants={itemVariants} className="grid items-end gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--portfolio-muted)]">
              Photo Highlights
            </p>
            <h2
              className="text-4xl font-semibold tracking-tight text-[var(--portfolio-text)] md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Defining moments
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--portfolio-muted)] md:text-base">
              A curated visual narrative of leadership, legal exposure, and communication milestones
              presented with editorial clarity.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-[var(--portfolio-border)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--portfolio-muted)]">
                Editorial Layout
              </p>
              <span className="h-px flex-1 bg-[var(--portfolio-border)]" />
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--portfolio-border)] bg-white/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.07)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--portfolio-muted)]">
              Section Snapshot
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[var(--portfolio-surface)] px-3 py-2">
                <p className="text-xs text-[var(--portfolio-muted)]">Milestones</p>
                <p className="text-lg font-semibold text-[var(--portfolio-text)]">4</p>
              </div>
              <div className="rounded-2xl bg-[var(--portfolio-surface)] px-3 py-2">
                <p className="text-xs text-[var(--portfolio-muted)]">Focus</p>
                <p className="text-lg font-semibold text-[var(--portfolio-text)]">Leadership</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-6 text-[var(--portfolio-muted)]">
              From youth parliament leadership to advocacy platforms, each moment reflects
              responsibility, poise, and legal discipline.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 grid gap-6 xl:grid-cols-12">
          <article className="group overflow-hidden rounded-[34px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] shadow-[0_16px_38px_rgba(0,0,0,0.08)] xl:col-span-8">
            <div className="grid h-full md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[330px] md:min-h-[510px]">
                <img
                  src={primaryMoment.image}
                  alt={primaryMoment.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  style={{ objectPosition: primaryMoment.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/8 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  Featured Moment
                </span>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-black/20 p-4 backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
                    {primaryMoment.subtitle}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">
                    {primaryMoment.title}
                  </h3>
                </div>
              </div>

              <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#fffef9] via-[#fff] to-[#f7f2e8] p-6 md:p-8">
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-muted)]">
                      Moment 01
                    </span>
                    <span className="rounded-full border border-[var(--portfolio-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--portfolio-muted)]">
                      {primaryMoment.year}
                    </span>
                  </div>

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-pink-700">
                    <PrimaryIcon className="h-3.5 w-3.5" />
                    {primaryMoment.impact}
                  </div>

                  <p className="text-sm leading-7 text-[var(--portfolio-muted)]">
                    {primaryMoment.description}
                  </p>

                  <div className="mt-6 space-y-2 border-l border-[var(--portfolio-border)] pl-4">
                    {primaryMoment.notes.map((note) => (
                      <p key={note} className="text-xs leading-6 text-[var(--portfolio-muted)]">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>

                <a
                  href="#internships"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--portfolio-text)] transition hover:text-[var(--portfolio-accent)]"
                >
                  View full internship exposure
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          <div className="rounded-[30px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-6 shadow-[0_10px_26px_rgba(0,0,0,0.07)] xl:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--portfolio-muted)]">
              Curated for impact
            </p>
            <h3
              className="mt-3 text-2xl font-semibold text-[var(--portfolio-text)]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Leadership with substance
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">
              The section is designed like an editorial spread: one signature milestone upfront,
              followed by supporting moments that complete the narrative arc.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "National policy dialogue exposure",
                "Institutional and team leadership",
                "Communication and advocacy growth",
              ].map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-2 rounded-xl border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] px-3 py-2.5"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--portfolio-accent)]" />
                  <p className="text-sm text-[var(--portfolio-muted)]">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {secondaryMoments.map((moment, index) => {
            const Icon = moment.icon;

            return (
              <article
                key={moment.title}
                className="group overflow-hidden rounded-[28px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] shadow-[0_8px_26px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                    style={{ objectPosition: moment.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {moment.year}
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-muted)]">
                      <Icon className="h-3.5 w-3.5" />
                      {moment.subtitle}
                    </div>
                    <span className="text-xs font-semibold text-[var(--portfolio-muted)]">0{index + 2}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-[var(--portfolio-text)]">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--portfolio-muted)]">
                    {moment.description}
                  </p>
                  <p className="mt-3 border-t border-[var(--portfolio-border)] pt-3 text-xs leading-6 text-[var(--portfolio-muted)]">
                    {moment.notes[0]}
                  </p>
                </div>
              </article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
