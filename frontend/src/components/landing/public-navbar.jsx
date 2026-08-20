import { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowUpRight, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { CommandPaletteHint } from "@/components/common/command-palette";
import { cn } from "@/utils";

const links = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Intelligence", href: "#ai-capabilities" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
    const previous = scrollY.getPrevious() ?? 0;
    if (open) return;
    setHidden(latest > previous && latest > 160);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-300",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-300",
            scrolled && "glass shadow-(--shadow-soft)",
          )}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-bold"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-500 text-white">
              <Radar className="h-4 w-4" />
            </span>
            HireSense<span className="text-signal-500">.ai</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-[rgb(var(--fg-muted))] transition-colors hover:bg-[rgb(var(--surface-2))] hover:text-[rgb(var(--fg))]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <CommandPaletteHint className="hidden xl:inline-flex" />
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Get started <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[rgb(var(--fg))] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 overflow-hidden rounded-lg lg:hidden glass"
            >
              <div className="flex flex-col gap-1 p-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[rgb(var(--surface-2))]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex items-center gap-2 border-t border-[rgb(var(--border))] pt-3">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register" className="flex-1">
                    <Button className="w-full" size="sm">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
