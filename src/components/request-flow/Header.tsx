type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-(--accent-2) shadow-[0_18px_40px_-28px_rgba(21,26,44,0.5)] backdrop-blur">
        Form-heavy workflow
      </div>
      <h1 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-lg text-(--ink-muted)">
        {subtitle}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--ink-muted)">
        <span className="rounded-full border border-white/70 bg-white/80 px-4 py-2">
          Secure intake
        </span>
        <span className="rounded-full border border-white/70 bg-white/80 px-4 py-2">
          Guided steps
        </span>
      </div>
    </div>
  );
}





