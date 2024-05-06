import { mockMedicalDocumentations } from "@/src/mocks/mockMedicalDocumentations";
import { Box, Container, Typography } from "@mui/material";
import { MedicalDocumentationEntryCard } from "./MedicalDocumentationEntryCard";
import { getCurrentUserId } from "@/src/utils/utils";

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

export default async function Page() {
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
    </Container>
  );
}
