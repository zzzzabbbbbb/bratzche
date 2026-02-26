"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { pieces } from "@/lib/pieces";
import { useRouter } from "next/navigation";

interface Node {
  slug: string;
  title: string;
  tags: string[];
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Edge {
  from: number;
  to: number;
  shared: string[];
  flicker: number;
}

export default function NodeMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const mouseRef = useRef({ x: -1, y: -1 });
  const hoveredRef = useRef<number>(-1);
  const frameRef = useRef(0);
  const router = useRouter();
  const [floatingTags, setFloatingTags] = useState<
    { text: string; x: number; y: number; opacity: number; id: number }[]
  >([]);
  const tagIdRef = useRef(0);

  const init = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const spread = Math.min(w, h) * 0.3;

    const nodes: Node[] = pieces.map((p, i) => {
      const angle = (i / pieces.length) * Math.PI * 2 + Math.random() * 0.5;
      const dist = spread * (0.6 + Math.random() * 0.4);
      return {
        slug: p.slug,
        title: p.title,
        tags: p.tags,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 5 + p.tags.length * 2,
      };
    });

    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const shared = nodes[i].tags.filter((t) => nodes[j].tags.includes(t));
        if (shared.length > 0) {
          edges.push({ from: i, to: j, shared, flicker: Math.random() });
        }
      }
    }

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  useEffect(() => {
    init();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) init();
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const animate = () => {
      frameRef.current++;
      const frame = frameRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.998;
        n.vy *= 0.998;
        n.vx += (Math.random() - 0.5) * 0.04;
        n.vy += (Math.random() - 0.5) * 0.04;

        if (n.x < 80) n.vx += 0.1;
        if (n.x > w - 80) n.vx -= 0.1;
        if (n.y < 80) n.vy += 0.1;
        if (n.y > h - 80) n.vy -= 0.1;
      });

      let hovered = -1;
      nodes.forEach((n, i) => {
        const dx = mx - n.x;
        const dy = my - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.radius + 30) {
          hovered = i;
        }
      });
      hoveredRef.current = hovered;

      edges.forEach((e) => {
        e.flicker += 0.02 + Math.random() * 0.01;
        const a = nodes[e.from];
        const b = nodes[e.to];
        const isHovered = hovered === e.from || hovered === e.to;
        const flickerVal = Math.sin(e.flicker * 3) * 0.5 + 0.5;
        const alpha = isHovered ? 0.6 : flickerVal * 0.15;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);

        const cpx = (a.x + b.x) / 2 + Math.sin(frame * 0.01 + e.flicker) * 20;
        const cpy = (a.y + b.y) / 2 + Math.cos(frame * 0.01 + e.flicker) * 20;
        ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);

        ctx.strokeStyle = isHovered
          ? `rgba(0,255,0,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = isHovered ? 1.5 : 0.5;
        ctx.stroke();

        if (isHovered && frame % 60 === 0) {
          const midX = (a.x + b.x) / 2 + (Math.random() - 0.5) * 40;
          const midY = (a.y + b.y) / 2 + (Math.random() - 0.5) * 40;
          const tag = e.shared[Math.floor(Math.random() * e.shared.length)];
          const id = tagIdRef.current++;
          setFloatingTags((prev) => [...prev, { text: tag, x: midX, y: midY, opacity: 1, id }]);
          setTimeout(() => {
            setFloatingTags((prev) => prev.filter((t) => t.id !== id));
          }, 2000);
        }
      });

      nodes.forEach((n, i) => {
        const isHovered = hovered === i;
        const pulse = Math.sin(frame * 0.03 + i) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * (isHovered ? 1.8 : 1), 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? `rgba(0,255,0,0.9)`
          : `rgba(255,255,255,${pulse * 0.5})`;
        ctx.fill();

        if (isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,255,0,${0.15 + Math.sin(frame * 0.05) * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        ctx.font = `${isHovered ? "bold 16px" : "13px"} Helvetica, Arial, sans-serif`;
        ctx.fillStyle = isHovered ? "#00FF00" : `rgba(255,255,255,${pulse * 0.6})`;
        ctx.textAlign = "center";
        ctx.fillText(n.title, n.x, n.y + n.radius + 18);

        if (isHovered) {
          n.tags.forEach((tag, ti) => {
            const tagAngle = (ti / n.tags.length) * Math.PI * 2 + frame * 0.005;
            const tagDist = 50 + Math.sin(frame * 0.02 + ti) * 10;
            const tx = n.x + Math.cos(tagAngle) * tagDist;
            const ty = n.y + Math.sin(tagAngle) * tagDist;
            ctx.font = "10px Helvetica, Arial, sans-serif";
            ctx.fillStyle = `rgba(0,255,0,${0.4 + Math.sin(frame * 0.04 + ti) * 0.2})`;
            ctx.fillText(tag, tx, ty);
          });
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [init]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = () => {
    const idx = hoveredRef.current;
    if (idx >= 0 && nodesRef.current[idx]) {
      router.push(`/${nodesRef.current[idx].slug}`);
    }
  };

  return (
    <div className="relative w-full h-full" style={{ cursor: hoveredRef.current >= 0 ? "pointer" : "crosshair" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      {floatingTags.map((tag) => (
        <span
          key={tag.id}
          className="absolute font-mono text-xs text-neon/60 pointer-events-none animate-pulse"
          style={{
            left: tag.x,
            top: tag.y,
            transform: "translate(-50%, -50%)",
            animation: "fadeIn 0.5s ease, pulse-line 1.5s ease-in-out infinite",
          }}
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
}
