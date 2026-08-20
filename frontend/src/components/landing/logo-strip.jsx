const companies = [
  "Nimbus",
  "Fractal",
  "Orbital",
  "Ledgerly",
  "Northwind",
  "Vantage",
  "Circuitry",
  "Haven",
];

export function LogoStrip() {
  const loop = [...companies, ...companies];
  return (
    <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--surface))] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-[rgb(var(--fg-muted))]">
          Candidates prepped their way into offers at
        </p>
        <div className="mt-6 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {loop.map((c, i) => (
              <span
                key={i}
                className="font-display text-xl font-semibold text-[rgb(var(--fg-muted))]/60"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
