import Hero from "./sections/Hero";
import PhotoHighlights from "./sections/PhotoHighlights";
import FeaturedJourney from "./sections/FeaturedJourney";
import CaseStudies from "./sections/CaseStudies";
import PriyalAssistant from "./sections/PriyalAssistant";
import InternshipTimeline from "./sections/InternshipTimeline";
import MentorTestimonials from "./sections/MentorTestimonials";
import Contact from "./sections/Contact";
import { Particles } from "@/components/ui/particles";
import { StickyQuickActions } from "@/components/ui/sticky-quick-actions";

export default function App() {
  return (
    <main className="relative bg-[var(--portfolio-bg)] text-[var(--portfolio-text)]">
      <Particles
        className="fixed inset-0 z-0 opacity-60"
        quantity={110}
        staticity={55}
        ease={90}
        size={0.7}
        color="#8a7f6c"
      />
      <div className="relative z-10">
        <Hero />
        <PhotoHighlights />
        <FeaturedJourney />
        <CaseStudies />
        <PriyalAssistant />
        <InternshipTimeline />
        <MentorTestimonials />
        <Contact />
      </div>
      <StickyQuickActions />
    </main>
  );
}
