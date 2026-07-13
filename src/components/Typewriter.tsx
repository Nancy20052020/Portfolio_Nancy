"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
};

export function Typewriter({
  phrases,
  className = "",
  typingSpeed = 55,
  deletingSpeed = 32,
  pauseMs = 1800,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      const delta = deleting ? -1 : 1;
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + delta)),
        deleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="type-caret" aria-hidden>
        |
      </span>
    </span>
  );
}
