import { mockMedicalDocumentations } from "@/src/mocks/mockMedicalDocumentations";
import { Box, Button, Container, Typography } from "@mui/material";
import { MedicalDocumentationEntryCard } from "../MedicalDocumentationEntryCard";
import { getCurrentUserId, snakeToCamel } from "@/src/utils/utils";
import Link from "next/link";
import { MedicalDocumentation } from "@/src/models/medicalDocumentation";

const getMedicalDocumentation = async (patientId: number) => {
  const res = await fetch("http://localhost:8000/medical_documentation", {
    method: "GET",
    headers: {
      "user-id": String(patientId),
    },
    cache: "no-store",
  });

  if (res.ok) return snakeToCamel(await res.json()) as MedicalDocumentation;
  else console.error("Failed to fetch medical documentation:", res.statusText);

  return (
    mockMedicalDocumentations
      .filter(
        (medicalDocumentation) => medicalDocumentation.patientId === patientId
      )
      .pop() ?? null
  );
};

type MedicalDocumentationProps = {
  params: {
    id: number;
  };
};

export default async function Page({ params }: MedicalDocumentationProps) {
  const userId = getCurrentUserId();
  const medicalDocumentation = await getMedicalDocumentation(userId);

  if (!medicalDocumentation)
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">
          Medical documentation not found for user {userId}
        </Typography>
      </Container>
    );

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4">
        Medical documentation for user {userId}
      </Typography>

      {medicalDocumentation.medicalDocumentationEntries.map((entry) => {
        return <MedicalDocumentationEntryCard key={entry.id} entry={entry} />;
      })}

      <Button variant="contained">
        <Link href={`/medical-documentation/${params.id}/entry/new`}>
          Add new medical documentation entry
        </Link>
      </Button>
    </Container>
  );
}
