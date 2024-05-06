import { MedicalDocumentationEntry } from "./medicalDocumentationEntry";

export type MedicalDocumentation = {
  id: number;
  patientId: number;
  medicalDocumentationEntries: MedicalDocumentationEntry[];
};
