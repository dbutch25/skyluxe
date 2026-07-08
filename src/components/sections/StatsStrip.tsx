"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND_STATS } from "@/constants/brand";

function useCountUp(target: number, duration = 1600, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

interface StatItemProps {
  stat: {
    readonly value: number;
    readonly suffix: string;
    readonly label: string;
    readonly sub: string;
  };
  active: boolean;
  index: number;
}

function StatItem({ stat, active, index }: StatItemProps) {
  const count = useCountUp(stat.value, 1600, active);

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-10 transition-all duration-700 ease-out"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="font-julius text-white mb-2"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        {count}
        <span className="text-secondary-400">{stat.suffix}</span>
      </div>
      <div className="font-montserrat font-semibold text-white text-sm uppercase tracking-wider mb-1">
        {stat.label}
      </div>
      <div className="font-montserrat text-white/50 text-xs">{stat.sub}</div>
    </div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full bg-primary-950"
      aria-label="Skyluxe Roofing by the numbers"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 divide-y lg:divide-y-0">
          {BRAND_STATS.map((stat, i: number) => (
            <StatItem key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
