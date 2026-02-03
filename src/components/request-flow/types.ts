import type { FullRequest } from "@/lib/schemas";

export type FieldErrors = Record<string, string | undefined>;
export type StepMeta = { title: string; subtitle: string };
export type Step = 0 | 1 | 2;
export type UpdateField = <K extends keyof FullRequest>(
  key: K,
  value: FullRequest[K]
) => void;
