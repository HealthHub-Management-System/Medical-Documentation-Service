import { z } from "zod";

export type Referral = {
  id: number;
  doctorId: number;
  patientId: number;
  description: string;
};

export const NewReferralValidationSchema = z.object({
  doctorId: z.number(),
  patientId: z.number(),
  description: z.string(),
});

export type NewReferralForm = z.infer<typeof NewReferralValidationSchema>;
