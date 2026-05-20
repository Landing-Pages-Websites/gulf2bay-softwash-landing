"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Typewriter rotating-words component (landing-page-builder approved pattern).
 * Types a word char-by-char with a blinking caret, holds, backspaces, then
 * types the next word. Loops. Honors prefers-reduced-motion (renders first
 * word statically, no caret animation).
 */
type Props = {
  words: readonly string[];
  /** Min width in `ch` units to keep layout stable (longest word). */
  widthCh?: number;
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  gapMs?: number;
};

export function RotatingWords({
  words,
  widthCh,
  className = "",
  typeMs = 70,
  deleteMs = 40,
  holdMs = 1500,
  gapMs = 250,
}: Props) {
  const [text, setText] = useState(words[0] ?? "");
  const [reduced, setReduced] = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = (matches: boolean) => setReduced(matches);
    apply(mq.matches);
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || words.length === 0) {
      return;
    }
    let cancelled = false;
    const schedule = (fn: () => void, ms: number) => {
      timerRef.current = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };
    const typeWord = (word: string, i: number) => {
      if (i > word.length) {
        schedule(() => deleteWord(word, word.length), holdMs);
        return;
      }
      setText(word.slice(0, i));
      schedule(() => typeWord(word, i + 1), typeMs);
    };
    const deleteWord = (word: string, i: number) => {
      if (i < 0) {
        idxRef.current = (idxRef.current + 1) % words.length;
        schedule(() => typeWord(words[idxRef.current], 0), gapMs);
        return;
      }
      setText(word.slice(0, i));
      schedule(() => deleteWord(word, i - 1), deleteMs);
    };
    typeWord(words[idxRef.current], 0);
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words, reduced, typeMs, deleteMs, holdMs, gapMs]);

  return (
    <span
      className={`rotating-words ${className}`}
      style={widthCh ? { minWidth: `${widthCh}ch` } : undefined}
      aria-label={words.join(", ")}
    >
      <span className="rotating-words-text">{text || "\u00A0"}</span>
      <span className="rotating-words-caret" aria-hidden>
        |
      </span>
    </span>
  );
}
