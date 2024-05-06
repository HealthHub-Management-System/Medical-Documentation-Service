import { MedicalDocumentation } from "@/src/models/medicalDocumentation";
import { mockMedicalDocumentationEntries } from "@/src/mocks/mockMedicalDocumentationEntry";

export const medicalDocumentations: MedicalDocumentation[] = [
  {
    id: 301,
    patientId: 201,
    medicalDocumentationEntries: mockMedicalDocumentationEntries.filter(
      (entry) => entry.medicalDocumentationId === 301
    ),
  },
  {
    id: 302,
    patientId: 202,
    medicalDocumentationEntries: mockMedicalDocumentationEntries.filter(
      (entry) => entry.medicalDocumentationId === 302
    ),
  },
  {
    id: 303,
    patientId: 203,
    medicalDocumentationEntries: mockMedicalDocumentationEntries.filter(
      (entry) => entry.medicalDocumentationId === 303
    ),
  },
  {
    id: 304,
    patientId: 204,
    medicalDocumentationEntries: mockMedicalDocumentationEntries.filter(
      (entry) => entry.medicalDocumentationId === 304
    ),
  },
  {
    id: 305,
    patientId: 205,
    medicalDocumentationEntries: mockMedicalDocumentationEntries.filter(
      (entry) => entry.medicalDocumentationId === 305
    ),
  },
  {
    id: 306,
    patientId: 206,
    medicalDocumentationEntries: mockMedicalDocumentationEntries.filter(
      (entry) => entry.medicalDocumentationId === 306
    ),
  },
  {
    id: 307,
    patientId: 207,
    medicalDocumentationEntries: mockMedicalDocumentationEntries.filter(
      (entry) => entry.medicalDocumentationId === 307
    ),
  },
];
