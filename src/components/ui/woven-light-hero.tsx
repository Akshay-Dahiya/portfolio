import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowDownRight, CalendarClock, Download, Sparkles } from "lucide-react";
import * as THREE from "three";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export function WovenLightHero() {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const fontId = "woven-light-hero-fonts";
    let createdFontLink = false;
    let link = document.getElementById(fontId) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = fontId;
      link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      createdFontLink = true;
    }

    textControls.start((index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.06 + 0.7,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));

    buttonControls.start({
      opacity: 1,
      transition: { delay: 1.5, duration: 0.75 },
    });

    return () => {
      if (createdFontLink && link) {
        document.head.removeChild(link);
      }
    };
  }, [textControls, buttonControls]);

  const headline = "Priyal Sanjeev Kumar";

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--portfolio-surface)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(251,191,36,0.22),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(148,163,184,0.18),transparent_45%)]" />
      <WovenCanvas />
      <HeroNav />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-8">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--portfolio-muted)]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Law • Leadership • Advocacy
        </p>

        <h1
          className="text-5xl leading-[0.9] text-[var(--portfolio-text)] md:text-8xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            textShadow: "0 10px 30px rgba(255,255,255,0.7)",
          }}
        >
          {headline.split(" ").map((word, wordIndex) => (
            <span key={word} className="inline-block">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${word}-${charIndex}`}
                  custom={wordIndex * 8 + charIndex}
                  initial={{ opacity: 0, y: 45 }}
                  animate={textControls}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < headline.split(" ").length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        <motion.p
          custom={headline.length}
          initial={{ opacity: 0, y: 24 }}
          animate={textControls}
          className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[var(--portfolio-muted)] md:text-lg"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Curating a modern legal profile through internships, courtroom observation, legal drafting,
          policy dialogue, and public speaking moments that reflect depth and discipline.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={buttonControls}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <LiquidButton
            type="button"
            variant="solid"
            size="lg"
            onClick={() =>
              document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore Moments
            <ArrowDownRight className="h-4 w-4" />
          </LiquidButton>

          <LiquidButton asChild size="lg" variant="subtle" style={{ fontFamily: "'Inter', sans-serif" }}>
            <a href="#contact">Connect</a>
          </LiquidButton>

          <LiquidButton asChild size="lg" variant="subtle" style={{ fontFamily: "'Inter', sans-serif" }}>
            <a href="/Priyal-Sanjeev-Kumar-CV.pdf" download="Priyal-Sanjeev-Kumar-CV.pdf">
              Download CV
              <Download className="h-4 w-4" />
            </a>
          </LiquidButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={buttonControls}
          transition={{ delay: 1.85, duration: 0.6 }}
          className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3"
        >
          {[
            { label: "Legal Internships", value: "5+" },
            { label: "Leadership Forums", value: "National Level" },
            { label: "Core Strength", value: "Drafting + Research" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[var(--portfolio-border)] bg-white/80 px-4 py-3 text-left shadow-sm backdrop-blur-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--portfolio-muted)]">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--portfolio-text)]">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const HeroNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.8 } }}
      className="absolute left-0 right-0 top-0 z-20 p-5 md:p-7"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-[var(--portfolio-border)] bg-white/85 px-4 py-2 shadow-sm backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-[var(--portfolio-accent)]" />
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--portfolio-muted)] md:text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Priyal Portfolio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <LiquidButton asChild size="sm" variant="subtle" style={{ fontFamily: "'Inter', sans-serif" }}>
            <a href="#internships">
              Internship Timeline
              <ArrowDownRight className="h-3.5 w-3.5" />
            </a>
          </LiquidButton>
          <LiquidButton asChild size="sm" variant="subtle" style={{ fontFamily: "'Inter', sans-serif" }}>
            <a href="https://zoom.us/meeting/schedule" target="_blank" rel="noreferrer">
              Schedule Meeting
              <CalendarClock className="h-3.5 w-3.5" />
            </a>
          </LiquidButton>
        </div>
      </div>
    </motion.nav>
  );
};

const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = isSmallScreen ? 12000 : 28000;

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.45, 0.42, 200, 32);
    const sourcePositions = torusKnot.attributes.position;
    const sourceCount = sourcePositions.count;
    const palette = ["#111827", "#374151", "#92400e", "#78350f", "#475569"];

    for (let i = 0; i < particleCount; i += 1) {
      const vertexIndex = i % sourceCount;
      const x = sourcePositions.getX(vertexIndex);
      const y = sourcePositions.getY(vertexIndex);
      const z = sourcePositions.getZ(vertexIndex);
      const baseIndex = i * 3;

      positions[baseIndex] = x;
      positions[baseIndex + 1] = y;
      positions[baseIndex + 2] = z;

      originalPositions[baseIndex] = x;
      originalPositions[baseIndex + 1] = y;
      originalPositions[baseIndex + 2] = z;

      const color = new THREE.Color(palette[i % palette.length]);
      color.offsetHSL(0, 0, (i % 7) / 100);
      colors[baseIndex] = color.r;
      colors[baseIndex + 1] = color.g;
      colors[baseIndex + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isSmallScreen ? 0.015 : 0.018,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 0.58,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const forceRadius = isSmallScreen ? 1.1 : 1.35;
    const forceRadiusSq = forceRadius * forceRadius;
    const forceStrength = isSmallScreen ? 0.007 : 0.009;
    const returnStrength = isSmallScreen ? 0.0019 : 0.0015;
    const damping = isSmallScreen ? 0.9 : 0.93;
    let frameId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      const nextWidth = mount.clientWidth || window.innerWidth;
      const nextHeight = mount.clientHeight || window.innerHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const mouseWorldX = mouse.x * 2.6;
      const mouseWorldY = mouse.y * 2.6;

      for (let i = 0; i < particleCount; i += 1) {
        const baseIndex = i * 3;
        const currentX = positions[baseIndex];
        const currentY = positions[baseIndex + 1];
        const currentZ = positions[baseIndex + 2];

        const dx = currentX - mouseWorldX;
        const dy = currentY - mouseWorldY;
        const dz = currentZ;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < forceRadiusSq) {
          const dist = Math.max(Math.sqrt(distSq), 0.0001);
          const force = (forceRadius - dist) * forceStrength;
          velocities[baseIndex] += (dx / dist) * force;
          velocities[baseIndex + 1] += (dy / dist) * force;
          velocities[baseIndex + 2] += (dz / dist) * force;
        }

        velocities[baseIndex] += (originalPositions[baseIndex] - currentX) * returnStrength;
        velocities[baseIndex + 1] += (originalPositions[baseIndex + 1] - currentY) * returnStrength;
        velocities[baseIndex + 2] += (originalPositions[baseIndex + 2] - currentZ) * returnStrength;

        velocities[baseIndex] *= damping;
        velocities[baseIndex + 1] *= damping;
        velocities[baseIndex + 2] *= damping;

        positions[baseIndex] += velocities[baseIndex];
        positions[baseIndex + 1] += velocities[baseIndex + 1];
        positions[baseIndex + 2] += velocities[baseIndex + 2];
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsedTime * 0.04;
      points.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
