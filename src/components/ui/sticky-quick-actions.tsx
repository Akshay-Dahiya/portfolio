import { CalendarClock, Download, Mail } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const actions = [
  {
    label: "Download CV",
    href: "/Priyal-Sanjeev-Kumar-CV.pdf",
    icon: Download,
    download: "Priyal-Sanjeev-Kumar-CV.pdf",
  },
  {
    label: "Schedule Meeting",
    href: "https://zoom.us/meeting/schedule",
    icon: CalendarClock,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:priyalsanjeevkumar@gmail.com",
    icon: Mail,
  },
];

export function StickyQuickActions() {
  return (
    <div className="pointer-events-none fixed bottom-20 left-1/2 z-[72] w-[min(94vw,460px)] -translate-x-1/2 md:bottom-4 md:left-4 md:w-auto md:translate-x-0">
      <div className="pointer-events-auto flex items-center justify-center gap-2 rounded-full border border-[var(--portfolio-border)] bg-white/92 p-2 shadow-[0_14px_30px_rgba(0,0,0,0.13)] backdrop-blur-md">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <LiquidButton
              key={item.label}
              asChild
              variant="subtle"
              size="sm"
              className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.13em]"
            >
              <a
                href={item.href}
                download={item.download}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            </LiquidButton>
          );
        })}
      </div>
    </div>
  );
}
