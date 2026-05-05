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

export const PatientFormValidation = z.object({
  name: z.string().min(1, "Please provide name"),
  email: z.string().regex(/^\S+@\S+\.\S+$/, "Please provide a valid email address"),
  phone: z
    .string()
    .regex(
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?(\d[-.\s]?){6,9}\d$/,
      "Please provide a valid phone number",
    ),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z.string(),
  occupation: z.string(),
  emergencyContactName: z.string(),
  emergencyContactNumber: z
    .string()
    .refine(
      value => !value || /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?(\d[-.\s]?){6,9}\d$/.test(value),
      "Please provide a valid phone number",
    )
    .optional(),
  insuranceProvider: z.string(),
  insurancePolicyNumber: z.string(),
  primaryPhysician: z.string(),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine(value => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine(value => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine(value => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});
