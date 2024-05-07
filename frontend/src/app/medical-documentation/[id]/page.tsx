import { mockMedicalDocumentations } from "@/src/mocks/mockMedicalDocumentations";
import { Box, Button, Container, Typography } from "@mui/material";
import { MedicalDocumentationEntryCard } from "../MedicalDocumentationEntryCard";
import { getCurrentUserId } from "@/src/utils/utils";
import Link from "next/link";

const getMedicalDocumentation = async (patientId: number) => {
  // TODO logic for fetching this data from the backend

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
