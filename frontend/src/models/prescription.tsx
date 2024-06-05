import { z } from "zod";

export type Prescription = {
  id: number;
  doctorId: number;
  patientId: number;
  drugName: string;
  description: string;
};

export const NewPrescriptionValidationSchema = z.object({
  doctorId: z.number(),
  patientId: z.number(),
  drugName: z.string(),
  description: z.string(),
});

export type NewPrescriptionForm = z.infer<
  typeof NewPrescriptionValidationSchema
>;
