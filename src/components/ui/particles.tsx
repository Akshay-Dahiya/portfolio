import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

type ParticlesProps = {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
};

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const normalizedHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  const hexInt = Number.parseInt(normalizedHex, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

function remapValue(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
): number {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
}

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#9ca3af",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const frameRef = useRef<number | null>(null);
  const mousePosition = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const clearContext = useCallback(() => {
    const context = contextRef.current;
    const { w, h } = canvasSizeRef.current;
    if (context) {
      context.clearRect(0, 0, w, h);
    }
  }, []);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    const context = contextRef.current;
    if (!context) return;

    const { x, y, translateX, translateY, size: circleSize, alpha } = circle;
    context.save();
    context.translate(translateX, translateY);
    context.beginPath();
    context.arc(x, y, circleSize, 0, 2 * Math.PI);
    context.fillStyle = `rgba(${rgb.join(",")}, ${alpha})`;
    context.fill();
    context.restore();

    if (!update) {
      circlesRef.current.push(circle);
    }
  }, [rgb]);

  const circleParams = useCallback((): Circle => {
    const { w, h } = canvasSizeRef.current;
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(2)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, [size]);

  const drawParticles = useCallback(() => {
    clearContext();
    circlesRef.current = [];
    for (let i = 0; i < quantity; i += 1) {
      drawCircle(circleParams());
    }
  }, [circleParams, clearContext, drawCircle, quantity]);

  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!container || !canvas || !context) return;

    canvasSizeRef.current.w = container.offsetWidth;
    canvasSizeRef.current.h = container.offsetHeight;

    canvas.width = canvasSizeRef.current.w * dpr;
    canvas.height = canvasSizeRef.current.h * dpr;
    canvas.style.width = `${canvasSizeRef.current.w}px`;
    canvas.style.height = `${canvasSizeRef.current.h}px`;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
  }, [dpr]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext("2d");
    if (!contextRef.current) return;

    const animate = () => {
      clearContext();
      const { w, h } = canvasSizeRef.current;

      circlesRef.current.forEach((circle, index) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          h - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remappedEdge = Number.parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));

        if (remappedEdge > 1) {
          circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
        } else {
          circle.alpha = circle.targetAlpha * remappedEdge;
        }

        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;

        circle.translateX +=
          (mouseRef.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY +=
          (mouseRef.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        drawCircle(circle, true);

        if (
          circle.x < -circle.size ||
          circle.x > w + circle.size ||
          circle.y < -circle.size ||
          circle.y > h + circle.size
        ) {
          circlesRef.current.splice(index, 1);
          drawCircle(circleParams());
        }
      });

      frameRef.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    drawParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [circleParams, clearContext, drawCircle, drawParticles, ease, refresh, resizeCanvas, staticity, vx, vy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const { w, h } = canvasSizeRef.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;

    if (inside) {
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    }
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={containerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
