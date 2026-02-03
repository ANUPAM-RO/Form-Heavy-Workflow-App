import type { Step } from "./types";

type ProgressCardProps = {
  step: Step;
  subtitle: string;
};

export default function ProgressCard({ step, subtitle }: ProgressCardProps) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_30px_60px_-45px_rgba(21,26,44,0.5)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--ink-muted)">
            Progress
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            Step {step + 1} of 3
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`h-2.5 w-8 rounded-full transition ${
                index <= step
                  ? "bg-[linear-gradient(90deg,#e5622e,#f0a356)]"
                  : "bg-[#efe9dc]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 h-1.5 w-full rounded-full bg-[#efe9dc]">
        <div
          className="h-1.5 rounded-full bg-[linear-gradient(90deg,#e5622e,#f0a356)] transition-all"
          style={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-(--ink-muted)">{subtitle}</p>
    </div>
  );
}


