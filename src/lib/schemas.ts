import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2, "Enter a full name."),
  email: z.string().email("Enter a valid email address."),
  department: z.string().min(2, "Enter a department."),
  role: z.enum(["Employee", "Manager", "Contractor", "Student", "Other"]),
  employeeId: z.string().optional(),
});

export const step2Schema = z.object({
  category: z.enum([
    "Workplace conduct",
    "Harassment or discrimination",
    "Policy violation",
    "Safety concern",
    "Payroll or benefits",
    "Other",
  ]),
  incidentDate: z
    .string()
    .min(1, "Select a date.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Use a valid date."),
  location: z.string().min(2, "Enter a location."),
  summary: z.string().min(10, "Give a short summary (10+ characters).").max(500),
  impact: z.string().min(10, "Describe the impact (10+ characters).").max(1000),
});

export const step3Schema = z
  .object({
    priority: z.enum(["Low", "Normal", "High", "Urgent"]),
    requestedAction: z
      .string()
      .min(10, "Describe the outcome you want (10+ characters).")
      .max(500),
    contactPreference: z.enum(["Email", "Phone", "Either"]),
    phone: z.string().optional(),
    confidentiality: z.enum(["Standard", "Limited", "Strict"]),
    additionalNotes: z.string().max(600).optional(),
    agreement: z
      .boolean()
      .refine((value) => value === true, {
        message: "You must acknowledge the statement.",
      }),
  })
  .superRefine((values, ctx) => {
    if (values.contactPreference === "Phone" && !values.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Phone is required when phone contact is selected.",
      });
    }
  });

export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .extend({
    submittedAt: z.string().optional(),
  });

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type FullRequest = z.infer<typeof fullSchema>;
