import { Link } from "react-router-dom";
import { Radar, Rss, MessageCircle, Mail } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      "Resume Intelligence",
      "Mock Interviews",
      "ATS Analyzer",
      "Skill Gap Reports",
      "Analytics",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press Kit"],
  },
  {
    title: "Resources",
    links: ["Help Center", "API Docs", "Interview Guides", "Community"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security"],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-lg font-bold"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-500 text-white">
                <Radar className="h-4 w-4" />
              </span>
              HireSense<span className="text-signal-500">.ai</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[rgb(var(--fg-muted))]">
              Practice reads, resume signal, and hiring probability — a control
              room for the job you want.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Rss, MessageCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--border))] text-[rgb(var(--fg-muted))] transition-colors hover:border-signal-500 hover:text-signal-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[rgb(var(--fg-muted))] transition-colors hover:text-signal-500"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[rgb(var(--border))] pt-8 sm:flex-row">
          <p className="text-xs text-[rgb(var(--fg-muted))]">
            © {new Date().getFullYear()} HireSense AI, Inc. All rights reserved.
          </p>
          <p className="text-xs text-[rgb(var(--fg-muted))]">
            Built for people who over-prepare.
          </p>
        </div>
      </div>
    </footer>
  );
}
