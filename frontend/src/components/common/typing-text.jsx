import { useEffect, useState } from "react";

export function TypingText({
  words,
  className,
  typingSpeed = 55,
  pauseMs = 1400,
  deletingSpeed = 30,
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed,
        );
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseMs);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed,
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, pauseMs, deletingSpeed]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-current align-middle" />
    </span>
  );
}
