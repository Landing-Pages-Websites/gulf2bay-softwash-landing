"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `to` once the element scrolls into view.
 * Falls back to instantly showing `to` for users with prefers-reduced-motion.
 *
 * Designed to render a single numeric stat (no commas/decimals — keep
 * STATS values pre-formatted strings if you need anything more complex).
 */
type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  /** If `to` is "40-60", pass the high end here and put the literal label as `display`. */
  display?: string;
};

export function AnimatedCounter({
  to,
  duration = 1400,
  suffix = "",
  prefix = "",
  className = "",
  display,
}: Props) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      queueMicrotask(() => {
        setValue(to);
        setDone(true);
      });
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done) {
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
              else setDone(true);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, done]);

  return (
    <span ref={ref} className={className}>
      {display ? (done ? display : `${prefix}${value}${suffix}`) : `${prefix}${value}${suffix}`}
    </span>
  );
}
