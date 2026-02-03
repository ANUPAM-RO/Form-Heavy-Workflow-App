"use server";

import { fullSchema } from "@/lib/schemas";

export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  referenceId?: string;
};

function createReferenceId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `REQ-${stamp}-${random}`;
}

export async function submitRequest(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const payload = formData.get("payload");
  if (!payload || typeof payload !== "string") {
    return { status: "error", message: "Missing submission payload." };
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = JSON.parse(payload);
  } catch {
    return { status: "error", message: "Payload could not be parsed." };
  }

  const validated = fullSchema.safeParse(parsedPayload);
  if (!validated.success) {
    return {
      status: "error",
      message: "Submission failed validation. Please return to the form.",
    };
  }

  const referenceId = createReferenceId();

  return {
    status: "success",
    message: "Submission received.",
    referenceId,
  };
}
