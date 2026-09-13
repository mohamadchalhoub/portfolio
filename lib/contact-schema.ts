import { z } from "zod";

// Shared between the client form and the API route so both validate the
// same rules — the client copy is for immediate feedback, the server copy
// is the one that actually gates delivery.
export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(80),
  lastName: z.string().trim().min(1, "Last name is required.").max(80),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address.").max(200),
  subject: z.string().trim().min(1, "Subject is required.").max(150),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(4000, "Message must be under 4000 characters."),
  // Timestamp (ms) the form was rendered, used server-side to reject
  // submissions that arrive implausibly fast to have been typed by a person.
  startedAt: z.number(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
