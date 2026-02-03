import type { FullRequest } from "./schemas";

const STORAGE_KEY = "grievanceDraft:v1";

export function saveDraft(payload: FullRequest) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadDraft(): FullRequest | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FullRequest;
  } catch {
    return null;
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
