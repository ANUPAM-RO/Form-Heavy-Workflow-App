import { memo } from "react";
import type { FullRequest } from "@/lib/schemas";
import {
  CATEGORY_OPTIONS,
  CONFIDENTIALITY_OPTIONS,
  CONTACT_OPTIONS,
  DEPARTMENT_OPTIONS,
  PRIORITY_OPTIONS,
  ROLE_OPTIONS,
} from "./constants";
import type { FieldErrors, Step, UpdateField } from "./types";
import Field from "./Field";

type StepFieldsProps = {
  step: Step;
  form: FullRequest;
  errors: FieldErrors;
  onChange: UpdateField;
};

const StepFields = memo(function StepFields({
  step,
  form,
  errors,
  onChange,
}: StepFieldsProps) {
  return (
    <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
      {step === 0 ? (
        <>
          <Field label="Full name" error={errors.fullName}>
            <input
              value={form.fullName}
              onChange={(event) => onChange("fullName", event.target.value)}
              placeholder="Anupam Roy"
            />
          </Field>
          <Field label="Work email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="anupam@company.com"
            />
          </Field>
          <Field label="Department" error={errors.department}>
            <select
              value={form.department}
              onChange={(event) => onChange("department", event.target.value)}
            >
              <option value="" disabled>
                Select a department
              </option>
              {DEPARTMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Role" error={errors.role}>
            <select
              value={form.role}
              onChange={(event) =>
                onChange("role", event.target.value as FullRequest["role"])
              }
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Employee ID (optional)" error={errors.employeeId}>
            <input
              value={form.employeeId ?? ""}
              onChange={(event) => onChange("employeeId", event.target.value)}
              placeholder="EMP-01492"
            />
          </Field>
        </>
      ) : null}

      {step === 1 ? (
        <>
          <Field label="Issue category" error={errors.category}>
            <select
              value={form.category}
              onChange={(event) =>
                onChange("category", event.target.value as FullRequest["category"])
              }
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Incident date" error={errors.incidentDate}>
            <input
              type="date"
              value={form.incidentDate}
              onChange={(event) => onChange("incidentDate", event.target.value)}
            />
          </Field>
          <Field label="Location" error={errors.location}>
            <input
              value={form.location}
              onChange={(event) => onChange("location", event.target.value)}
              placeholder="Building, floor, city, or remote"
            />
          </Field>
          <Field label="Summary" error={errors.summary} full>
            <textarea
              value={form.summary}
              onChange={(event) => onChange("summary", event.target.value)}
              placeholder="Provide a concise timeline of events."
              rows={4}
            />
          </Field>
          <Field label="Impact statement" error={errors.impact} full>
            <textarea
              value={form.impact}
              onChange={(event) => onChange("impact", event.target.value)}
              placeholder="Describe business, team, or personal impact."
              rows={4}
            />
          </Field>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Field label="Priority" error={errors.priority}>
            <select
              value={form.priority}
              onChange={(event) =>
                onChange("priority", event.target.value as FullRequest["priority"])
              }
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Preferred contact" error={errors.contactPreference}>
            <select
              value={form.contactPreference}
              onChange={(event) =>
                onChange(
                  "contactPreference",
                  event.target.value as FullRequest["contactPreference"]
                )
              }
            >
              {CONTACT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Phone number"
            error={errors.phone}
            hint="Required if phone contact is selected."
          >
            <input
              value={form.phone ?? ""}
              onChange={(event) => onChange("phone", event.target.value)}
              placeholder="+1 (555) 820-5501"
            />
          </Field>
          <Field label="Confidentiality" error={errors.confidentiality}>
            <select
              value={form.confidentiality}
              onChange={(event) =>
                onChange(
                  "confidentiality",
                  event.target.value as FullRequest["confidentiality"]
                )
              }
            >
              {CONFIDENTIALITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Requested outcome" error={errors.requestedAction} full>
            <textarea
              value={form.requestedAction}
              onChange={(event) => onChange("requestedAction", event.target.value)}
              placeholder="Describe the resolution you want, timeframe, or specific actions."
              rows={4}
            />
          </Field>
          <Field label="Additional notes (optional)" error={errors.additionalNotes} full>
            <textarea
              value={form.additionalNotes ?? ""}
              onChange={(event) => onChange("additionalNotes", event.target.value)}
              placeholder="Anything else the review team should know?"
              rows={3}
            />
          </Field>
          <div className="md:col-span-2">
            <label className="flex items-start gap-3 rounded-2xl border border-(--edge) bg-white/80 p-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <input
                type="checkbox"
                checked={form.agreement}
                onChange={(event) => onChange("agreement", event.target.checked)}
                className="mt-1 h-4 w-4 accent-(--accent)"
              />
              <span>
                I acknowledge that the information provided is accurate to the
                best of my knowledge.
              </span>
            </label>
            {errors.agreement ? (
              <p className="mt-2 text-xs font-semibold text-(--accent)">
                {errors.agreement}
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
});

export default StepFields;

