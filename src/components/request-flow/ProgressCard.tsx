import type { Step } from "./types";

type ProgressCardProps = {
  step: Step;
  subtitle: string;
};

export default function ProgressCard({ step, subtitle }: ProgressCardProps) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_30px_60px_-45px_rgba(21,26,44,0.5)] backdrop-blur-xl">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-(--ink-muted)">
          Progress
        </span>
        <span className="text-foreground">Step {step + 1} of 3</span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-[#efe9dc]">
        <div
          className="h-2 rounded-full bg-[linear-gradient(90deg,#e5622e,#f0a356)] transition-all"
          style={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-(--ink-muted)">{subtitle}</p>
    </div>
  );
}


