import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shouldEnable = isFinePointer && !prefersReducedMotion;
    setEnabled(shouldEnable);
    document.documentElement.classList.toggle(
      "custom-cursor-active",
      shouldEnable,
    );
    return () =>
      document.documentElement.classList.remove("custom-cursor-active");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target;
      setHovering(
        !!target.closest(
          'a, button, [role="button"], input, textarea, [data-cursor-hover]',
        ),
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-999 mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.8 : 1 }}
      transition={{
        scale: { type: "spring", stiffness: 350, damping: 24 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="h-3 w-3 rounded-full bg-white" />
    </motion.div>
  );
}
