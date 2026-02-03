"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  type FullRequest,
} from "@/lib/schemas";
import {  loadDraft, saveDraft } from "@/lib/storage";
import { initialData, STEP_META } from "./constants";
import type { FieldErrors, Step, UpdateField } from "./types";
import Header from "./Header";
import ProgressCard from "./ProgressCard";
import DraftControls from "./DraftControls";
import StepFields from "./StepFields";

function toFieldErrors(error: z.ZodError<unknown>): FieldErrors {
  const flattened = error.flatten()
    .fieldErrors as Record<string, string[] | undefined>;
  return Object.fromEntries(
    Object.entries(flattened).map(([key, value]) => [key, value?.[0]])
  ) as FieldErrors;
}

export default function RequestFlow() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FullRequest>(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const draft = loadDraft();
    if (draft) {
      setForm({ ...initialData, ...draft });
      setHasDraft(true);
    }
  }, [isMounted]);

  const updateField = useCallback<UpdateField>((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    const schema: z.ZodTypeAny =
      step === 0 ? step1Schema : step === 1 ? step2Schema : step3Schema;
    const result = schema.safeParse(form);
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return false;
    }
    setErrors({});
    return true;
  }, [form, step]);

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;
    if (step < 2) {
      setStep((prev) => (prev + 1) as Step);
      return;
    }
    saveDraft({ ...form, submittedAt: new Date().toISOString() });
    router.push("/review");
  }, [form, router, step, validateCurrentStep]);

  const handleBack = useCallback(() => {
    setStep((prev) => (Math.max(prev - 1, 0) as Step));
  }, []);

  const showDraftMessage = useCallback((message: string) => {
    setDraftMessage(message);
    window.setTimeout(() => setDraftMessage(""), 2000);
  }, []);

  const handleSaveDraft = useCallback(() => {
    saveDraft({ ...form, submittedAt: new Date().toISOString() });
    setHasDraft(true);
    showDraftMessage("Draft saved.");
  }, [form, showDraftMessage]);

  const handleRestoreDraft = useCallback(() => {
    const draft = loadDraft();
    if (!draft) return;
    setForm({ ...initialData, ...draft });
    setHasDraft(true);
    showDraftMessage("Draft restored.");
  }, [showDraftMessage]);

  const handleClearDraft = useCallback(() => {
    setForm(initialData);
    setErrors({});
    showDraftMessage("Form cleared.");
  }, [showDraftMessage]);

  const currentMeta = STEP_META[step];

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-10"
      suppressHydrationWarning
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,98,46,0.18),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-120 w-120 translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(46,139,184,0.18),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 sm:gap-10">
        <header className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <Header
            title="Grievance & Request Submission"
            subtitle="Capture incident details, required approvals, and resolution intent in a guided multi-step flow. Save drafts anytime and return later."
          />
          <ProgressCard step={step} subtitle={currentMeta.subtitle} />
        </header>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_40px_90px_-60px_rgba(21,26,44,0.7)] backdrop-blur-xl md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                {currentMeta.title}
              </h2>
              <p className="mt-1 text-sm text-(--ink-muted)">
                All fields are required unless marked optional.
              </p>
            </div>
            <DraftControls
              message={draftMessage}
              hasDraft={hasDraft}
              onSave={handleSaveDraft}
              onRestore={handleRestoreDraft}
              onClear={handleClearDraft}
            />
          </div>

          <StepFields step={step} form={form} errors={errors} onChange={updateField} />

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="w-full cursor-pointer rounded-full border border-(--edge) bg-white/70 px-5 py-2 text-sm font-semibold text-(--ink-muted) transition hover:-translate-y-0.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-full cursor-pointer rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(21,26,44,0.7)] transition hover:-translate-y-0.5 sm:w-auto"
            >
              {step < 2 ? "Next" : "Review submission"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}




