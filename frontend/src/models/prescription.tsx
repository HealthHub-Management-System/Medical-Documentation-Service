import { z } from "zod";

export type Prescription = {
  id: number;
  doctorId: string;
  patientId: string;
  drugName: string;
  description: string;
};

export const NewPrescriptionValidationSchema = z.object({
  doctorId: z.string(),
  patientId: z.string(),
  drugName: z.string(),
  description: z.string(),
});

export type NewPrescriptionForm = z.infer<
  typeof NewPrescriptionValidationSchema
>;
