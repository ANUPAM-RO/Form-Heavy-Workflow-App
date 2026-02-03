import type { FullRequest } from "@/lib/schemas";
import type { StepMeta } from "./types";

export const STEP_META: StepMeta[] = [
  { title: "Requester profile", subtitle: "Who is submitting this?" },
  { title: "Incident details", subtitle: "What happened and when?" },
  { title: "Resolution plan", subtitle: "How should we respond?" },
];

export const ROLE_OPTIONS: FullRequest["role"][] = [
  "Employee",
  "Manager",
  "Contractor",
  "Student",
  "Other",
];

export const DEPARTMENT_OPTIONS: string[] = [
  "Operations",
  "People",
  "Security",
  "Finance",
  "Legal",
  "Engineering",
  "IT",
  "Sales",
  "Marketing",
  "Facilities",
  "Other",
];

export const CATEGORY_OPTIONS: FullRequest["category"][] = [
  "Workplace conduct",
  "Harassment or discrimination",
  "Policy violation",
  "Safety concern",
  "Payroll or benefits",
  "Other",
];

export const PRIORITY_OPTIONS: FullRequest["priority"][] = [
  "Low",
  "Normal",
  "High",
  "Urgent",
];

export const CONTACT_OPTIONS: FullRequest["contactPreference"][] = [
  "Email",
  "Phone",
  "Either",
];

export const CONFIDENTIALITY_OPTIONS: FullRequest["confidentiality"][] = [
  "Standard",
  "Limited",
  "Strict",
];

export const initialData: FullRequest = {
  fullName: "",
  email: "",
  department: "",
  role: "Employee",
  employeeId: "",
  category: "Workplace conduct",
  incidentDate: "",
  location: "",
  summary: "",
  impact: "",
  priority: "Normal",
  requestedAction: "",
  contactPreference: "Email",
  phone: "",
  confidentiality: "Standard",
  additionalNotes: "",
  agreement: false,
};
