import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface DeliverySchedulerProps {
  initialDate?: Date;
  timeSlots: string[];
  timeZone: string;
  onSchedule: (dateTime: { date: Date; time: string }) => void;
  className?: string;
}

const scheduleButtonVariants = cva(
  "relative isolate inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-[transform,color,box-shadow,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)]/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--portfolio-border)] bg-white/70 text-[var(--portfolio-text)] shadow-[0_6px_14px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md hover:-translate-y-0.5 hover:bg-white",
        selected:
          "border border-amber-300 bg-[var(--portfolio-accent)] text-white shadow-[0_10px_22px_rgba(180,83,9,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const getWeekDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  const startOfWeek = new Date(startDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);

  for (let index = 0; index < 6; index += 1) {
    const nextDay = new Date(startOfWeek);
    nextDay.setDate(startOfWeek.getDate() + index);
    days.push(nextDay);
  }

  return days;
};

export function DeliveryScheduler({
  initialDate = new Date(),
  timeSlots,
  timeZone,
  onSchedule,
  className,
}: DeliverySchedulerProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[0] ?? null);

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const monthYear = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const changeWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const resetSelection = () => {
    setSelectedDate(initialDate);
    setCurrentDate(initialDate);
    setSelectedTime(timeSlots[0] ?? null);
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return;
    onSchedule({ date: selectedDate, time: selectedTime });
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] p-6 text-[var(--portfolio-text)] shadow-[0_14px_34px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--portfolio-muted)]">
            Appointment Window
          </label>
          <div className="mt-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[var(--portfolio-text)]">{monthYear}</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeWeek("prev")}
                className="rounded-md border border-[var(--portfolio-border)] bg-white/72 p-1 text-[var(--portfolio-muted)] shadow-[0_6px_12px_rgba(0,0,0,0.06)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-[var(--portfolio-text)]"
                aria-label="Previous week"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => changeWeek("next")}
                className="rounded-md border border-[var(--portfolio-border)] bg-white/72 p-1 text-[var(--portfolio-muted)] shadow-[0_6px_12px_rgba(0,0,0,0.06)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-[var(--portfolio-text)]"
                aria-label="Next week"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {weekDays.map((day) => {
            const isSelected = selectedDate.toDateString() === day.toDateString();

            return (
              <div key={day.toISOString()} className="relative flex flex-col items-center">
                <span className="mb-2 text-[11px] font-medium text-[var(--portfolio-muted)]">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    scheduleButtonVariants({ variant: isSelected ? "selected" : "default" }),
                    "h-10 w-10",
                  )}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="date-selector"
                        className="absolute inset-0 z-0 rounded-lg bg-[var(--portfolio-accent)]"
                        initial={{ scale: 0.55, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.55, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{day.getDate()}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <p className="text-sm font-medium text-[var(--portfolio-text)]">{timeZone}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    scheduleButtonVariants({ variant: isSelected ? "selected" : "default" }),
                    "h-10",
                  )}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="time-selector"
                        className="absolute inset-0 z-0 rounded-lg bg-[var(--portfolio-accent)]"
                        initial={{ scale: 0.55, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.55, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{time}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[var(--portfolio-border)] pt-4">
          <button
            type="button"
            onClick={resetSelection}
            className={cn(scheduleButtonVariants({ variant: "default" }), "px-5")}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSchedule}
            disabled={!selectedTime}
            className={cn(
              scheduleButtonVariants({ variant: "selected" }),
              "bg-[var(--portfolio-accent)] px-5",
            )}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
