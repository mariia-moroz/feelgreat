import * as z from "zod";

export const UserFormValidation = z.object({
  name: z.string(),
  email: z.string().regex(/^\S+@\S+\.\S+$/, "Please provide a valid email address"),
  phone: z
    .string()
    .regex(
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?(\d[-.\s]?){6,9}\d$/,
      "Please provide a valid phone number",
    ),
});
