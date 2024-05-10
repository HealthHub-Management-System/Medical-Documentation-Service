import { z } from "zod";

export type Prescription = {
  id: number;
  doctorId: number;
  patientId: number;
  description: string;
};

export const NewPrescriptionValidationSchema = z.object({
  doctorId: z.number(),
  patientId: z.number(),
  description: z.string(),
});

export type NewPrescriptionForm = z.infer<
  typeof NewPrescriptionValidationSchema
>;
