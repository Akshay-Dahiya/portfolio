import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export function Timeline({
  data,
  heading = "Internship Journey",
  description = "A professional timeline of legal internships, court exposure, research experience, and practical legal training.",
}: {
  data: TimelineEntry[];
  heading?: string;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={containerRef} className="w-full bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
          Experience
        </p>
        <h2 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">{heading}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
          {description}
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl px-4 pb-20 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex justify-start gap-0 pt-10 md:gap-10 md:pt-24">
            <div className="sticky top-32 z-20 flex w-16 shrink-0 justify-center md:w-full md:max-w-xs md:justify-start lg:max-w-sm">
              <div className="relative flex w-full items-start md:pl-2">
                <div className="absolute left-[22px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                </div>

                <div className="hidden pl-14 md:block">
                  <h3 className="text-2xl font-bold text-neutral-800">{item.title}</h3>
                  {item.subtitle ? <p className="mt-2 text-sm font-medium text-neutral-500">{item.subtitle}</p> : null}
                </div>
              </div>
            </div>

            <div className="relative w-full pl-10 pr-0 md:pl-4">
              <div className="mb-4 block md:hidden">
                <h3 className="text-xl font-bold text-neutral-800">{item.title}</h3>
                {item.subtitle ? <p className="mt-1 text-sm font-medium text-neutral-500">{item.subtitle}</p> : null}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-[29px] top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-200 to-transparent md:left-[31px]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500"
          />
        </div>
      </div>
    </section>
  );
}