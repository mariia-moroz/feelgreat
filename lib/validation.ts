import { AppointmentType } from "@/constants";
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

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Please select physician"),
  schedule: z.coerce.date().min(2, "Please provide date"),
  reason: z.string().min(2, "Please provide reason"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Please select physician"),
  schedule: z.coerce.date().min(2, "Please provide date"),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string(),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().min(2, "Please provide reason"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case AppointmentType.CREATE:
      return CreateAppointmentSchema;
    case AppointmentType.CANCEL:
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
