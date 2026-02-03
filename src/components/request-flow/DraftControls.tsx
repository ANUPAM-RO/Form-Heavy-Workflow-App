type DraftControlsProps = {
  message: string;
  hasDraft: boolean;
  onSave: () => void;
  onRestore: () => void;
  onClear: () => void;
};

export default function DraftControls({
  message,
  hasDraft,
  onSave,
  onRestore,
  onClear,
}: DraftControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {message ? (
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-(--ink-muted) shadow-sm">
          {message}
        </span>
      ) : null}
      <button
        type="button"
        onClick={onSave}
        className="cursor-pointer rounded-full border border-(--edge) bg-white/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-md"
      >
        Save draft
      </button>
      {hasDraft ? (
        <>
          <button
            type="button"
            onClick={onRestore}
            className="cursor-pointer rounded-full border border-(--edge) bg-white/70 px-4 py-2 text-sm font-semibold text-(--accent-2) transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Restore
          </button>
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer rounded-full bg-white/50 px-4 py-2 text-sm font-semibold text-(--ink-muted) transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Clear
          </button>
        </>
      ) : null}
    </div>
  );
}
