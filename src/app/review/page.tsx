"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { submitRequest, type ActionState } from "../actions";
import { clearDraft, loadDraft } from "@/lib/storage";
import type { FullRequest } from "@/lib/schemas";

const initialState: ActionState = { status: "idle" };

export default function ReviewPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<FullRequest | null>(null);
  const [state, formAction, isPending] = useActionState(
    submitRequest,
    initialState
  );

  useEffect(() => {
    const draft = loadDraft();
    setPayload(draft);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      clearDraft();
      toast.success("Submission successful. Your request is now in review.", {
        toastId: "submit-success",
      });
      const timer = window.setTimeout(() => {
        router.push("/");
      }, 1500);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [state.status]);

  const summary = useMemo(() => {
    if (!payload) return [];
    return [
      { label: "Requester", value: payload.fullName },
      { label: "Work email", value: payload.email },
      { label: "Department", value: payload.department },
      { label: "Role", value: payload.role },
      { label: "Employee ID", value: payload.employeeId || "—" },
      { label: "Category", value: payload.category },
      { label: "Incident date", value: payload.incidentDate },
      { label: "Location", value: payload.location },
      { label: "Priority", value: payload.priority },
      { label: "Preferred contact", value: payload.contactPreference },
      { label: "Phone", value: payload.phone || "—" },
      { label: "Confidentiality", value: payload.confidentiality },
      { label: "Agreement", value: payload.agreement ? "Accepted" : "Not accepted" },
    ];
  }, [payload]);

  const handleDownloadSummary = useCallback(() => {
    if (!payload) return;
    const lines = [
      "Submission Summary",
      "",
      `Requester: ${payload.fullName}`,
      `Work email: ${payload.email}`,
      `Department: ${payload.department}`,
      `Role: ${payload.role}`,
      `Employee ID: ${payload.employeeId || "—"}`,
      `Category: ${payload.category}`,
      `Incident date: ${payload.incidentDate}`,
      `Location: ${payload.location}`,
      `Summary: ${payload.summary}`,
      `Impact: ${payload.impact}`,
      `Priority: ${payload.priority}`,
      `Requested outcome: ${payload.requestedAction}`,
      `Preferred contact: ${payload.contactPreference}`,
      `Phone: ${payload.phone || "—"}`,
      `Confidentiality: ${payload.confidentiality}`,
      `Additional notes: ${payload.additionalNotes || "—"}`,
      `Agreement: ${payload.agreement ? "Accepted" : "Not accepted"}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "submission-summary.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, [payload]);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-[15%] h-90 w-90 rounded-full bg-[radial-gradient(circle,rgba(229,98,46,0.18),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-[5%] h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(46,139,184,0.2),transparent_70%)] blur-3xl"
      />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnHover
        className="z-50"
        toastClassName="!rounded-2xl !border !border-white/60 !bg-white/90 !text-(--ink) !shadow-[0_20px_60px_-35px_rgba(21,26,44,0.6)] !backdrop-blur-xl"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-(--accent-2)">
              Review
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Confirm & submit
            </h1>
            <p className="mt-3 max-w-xl text-lg text-(--ink-muted)">
              Check your answers before submitting. The team will receive a
              reference number after submission.
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_30px_70px_-50px_rgba(21,26,44,0.6)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-muted)">
              Quick actions
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/"
                className="cursor-pointer rounded-full border border-(--edge) bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-muted) transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Edit form
              </Link>
              <button
                type="button"
                onClick={handleDownloadSummary}
                className="cursor-pointer rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-muted) transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Download summary
              </button>
            </div>
          </div>
        </header>

        {!payload ? (
          <div className="rounded-3xl border border-white/60 bg-white/85 p-10 text-center shadow-[0_30px_70px_-50px_rgba(21,26,44,0.6)] backdrop-blur-xl">
            <p className="text-lg font-semibold">No draft found.</p>
            <p className="mt-2 text-sm text-(--ink-muted)">
              Return to the form to start a new submission.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex cursor-pointer rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(21,26,44,0.7)]"
            >
              Start a submission
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_35px_80px_-55px_rgba(21,26,44,0.6)] backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-muted)">
                    Submission overview
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold">
                    Summary
                  </h2>
                </div>
                <div className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-muted)">
                  Ready to submit
                </div>
              </div>
              <dl className="mt-6 grid gap-4 md:grid-cols-2">
                {summary.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-(--ink-muted)">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 grid gap-6">
                <TextBlock label="Summary" value={payload.summary} />
                <TextBlock label="Impact" value={payload.impact} />
                <TextBlock label="Requested outcome" value={payload.requestedAction} />
                {payload.additionalNotes ? (
                  <TextBlock label="Additional notes" value={payload.additionalNotes} />
                ) : null}
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-[0_30px_70px_-50px_rgba(21,26,44,0.6)] backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-muted)">
                  Final step
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  Submit to review team
                </h3>
                <p className="mt-2 text-sm text-(--ink-muted)">
                  Submission will be logged with your chosen confidentiality
                  level. You will receive updates via your preferred contact
                  method.
                </p>
                <form action={formAction} className="mt-6 space-y-4">
                  <input
                    type="hidden"
                    name="payload"
                    value={JSON.stringify({ ...payload, submittedAt: new Date().toISOString() })}
                  />
                  <SubmitButton isPending={isPending} />
                  {state.status === "success" ? (
                    <div className="rounded-2xl border border-[#cfe7dc] bg-[#eff9f2] p-4 text-sm text-[#215139]">
                      <p className="font-semibold">Submitted successfully.</p>
                      <p className="mt-1">
                        Reference ID:{" "}
                        <span className="font-semibold">{state.referenceId}</span>
                      </p>
                    </div>
                  ) : null}
                  {state.status === "error" ? (
                    <div className="rounded-2xl border border-[#f2c9c0] bg-[#fff1ee] p-4 text-sm text-[#7a2a1c]">
                      <p className="font-semibold">Submission failed.</p>
                      <p className="mt-1">{state.message}</p>
                    </div>
                  ) : null}
                </form>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/80 p-6 text-sm text-(--ink-muted) shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <p className="font-semibold text-foreground">
                  Data retention
                </p>
                <p className="mt-2">
                  Your local draft will be cleared after a successful submission.
                  Download the summary if you need a copy for your records.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function TextBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-muted)">
        {label}
      </p>
      <p className="mt-3 text-sm text-foreground">{value}</p>
    </div>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full cursor-pointer rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Submitting..." : "Submit request"}
    </button>
  );
}

