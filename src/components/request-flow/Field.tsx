import { memo, type ReactNode } from "react";

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  full?: boolean;
  children: ReactNode;
};

const Field = memo(function Field({ label, error, hint, full, children }: FieldProps) {
  return (
    <label
      className={`flex flex-col gap-2 text-sm font-semibold text-foreground ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <span>{label}</span>
      <div className="rounded-2xl border border-(--edge) bg-white/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition hover:border-(--accent-2) focus-within:border-(--accent-2) focus-within:shadow-[0_0_0_3px_rgba(46,139,184,0.18)]">
        <div className="flex flex-col gap-2">
          <div className="text-[15px] font-normal text-foreground [&>input]:w-full [&>select]:w-full [&>textarea]:w-full [&>input]:bg-transparent [&>select]:bg-transparent [&>textarea]:bg-transparent [&>input]:outline-none [&>select]:outline-none [&>textarea]:outline-none [&>input]:placeholder:text-(--ink-muted) [&>textarea]:placeholder:text-(--ink-muted) [&>select]:text-foreground">
            {children}
          </div>
          {hint ? (
            <span className="text-xs font-normal text-(--ink-muted)">
              {hint}
            </span>
          ) : null}
        </div>
      </div>
      {error ? (
        <span className="text-xs font-semibold text-(--accent)">
          {error}
        </span>
      ) : null}
    </label>
  );
});

export default Field;


