import { useState } from "react";
import { BadgeCheck, CalendarClock, Download, Linkedin, Mail, PhoneCall } from "lucide-react";
import { DeliveryScheduler } from "@/components/ui/delivery-scheduler";

const contacts = [
  {
    label: "Email",
    value: "priyalsanjeevkumar@gmail.com",
    href: "mailto:priyalsanjeevkumar@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 8287419392",
    href: "tel:+918287419392",
    icon: PhoneCall,
  },
  {
    label: "LinkedIn",
    value: "View profile",
    href: "https://www.linkedin.com/in/priyal-sanjeev-kumar-1832a8302/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Availability",
    value: "Open for Legal Internships",
    href: "#internships",
    icon: BadgeCheck,
  },
  {
    label: "Download CV",
    value: "Priyal-Sanjeev-Kumar-CV.pdf",
    href: "/Priyal-Sanjeev-Kumar-CV.pdf",
    icon: Download,
    download: "Priyal-Sanjeev-Kumar-CV.pdf",
  },
];

export default function Contact() {
  const cvHref = `${import.meta.env.BASE_URL}Priyal-Sanjeev-Kumar-CV.pdf`;
  const [selectionMessage, setSelectionMessage] = useState("");

  const handleSchedule = ({ date, time }: { date: Date; time: string }) => {
    const formattedDate = date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    setSelectionMessage(`Preferred slot: ${formattedDate} at ${time} (IST)`);
    window.open("https://zoom.us/meeting/schedule", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="bg-[var(--portfolio-surface)] px-4 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:p-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--portfolio-muted)]">
          Contact
        </p>
        <h2
          className="text-3xl font-semibold tracking-tight text-[var(--portfolio-text)] md:text-5xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Let’s connect professionally
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--portfolio-muted)] md:text-base">
          Priyal is open to internships, legal research collaboration, drafting assignments, and
          meaningful legal-network opportunities.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.download ? cvHref : item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                download={item.download}
                className="group rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[var(--portfolio-muted)]">
                  <Icon className="h-4 w-4" />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
                <p
                  className={`mt-3 font-semibold text-[var(--portfolio-text)] ${
                    item.label === "Email"
                      ? "break-all text-[13px] leading-5"
                      : "text-sm"
                  }`}
                >
                  {item.value}
                </p>
              </a>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 rounded-[28px] border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--portfolio-border)] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-muted)]">
              <CalendarClock className="h-3.5 w-3.5 text-[var(--portfolio-accent)]" />
              Zoom Appointment
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--portfolio-text)] md:text-3xl">
              Schedule a professional call
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--portfolio-muted)]">
              Select a suitable day and time for a Zoom conversation regarding internships,
              collaboration, or legal research opportunities.
            </p>

            <div className="mt-5 rounded-2xl border border-[var(--portfolio-border)] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-muted)]">
                Selection status
              </p>
              <p className="mt-2 text-sm font-medium text-[var(--portfolio-text)]">
                {selectionMessage || "No slot selected yet."}
              </p>
              <p className="mt-2 text-xs leading-6 text-[var(--portfolio-muted)]">
                On clicking Schedule, Zoom scheduler opens in a new tab.
              </p>
            </div>
          </div>

          <DeliveryScheduler
            className="max-w-none"
            timeZone="Asia/Kolkata (IST)"
            timeSlots={["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"]}
            onSchedule={handleSchedule}
          />
        </div>
      </div>
    </section>
  );
}
