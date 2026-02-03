type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-(--accent-2)">
        Form-heavy workflow
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-foreground md:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-lg text-(--ink-muted)">
        {subtitle}
      </p>
    </div>
  );
}





