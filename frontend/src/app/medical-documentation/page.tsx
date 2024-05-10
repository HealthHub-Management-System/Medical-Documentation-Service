import { mockMedicalDocumentations } from "@/src/mocks/mockMedicalDocumentations";
import { Container, Typography } from "@mui/material";
import { MedicalDocumentationEntryCard } from "./MedicalDocumentationEntryCard";
import { getCurrentUserId, snakeToCamel } from "@/src/utils/utils";
import { MedicalDocumentation } from "@/src/models/medicalDocumentation";
import { LinkButton } from "../components/LinkButton";

const getMedicalDocumentation = async (patientId: number) => {
  const res = await fetch(
    `http://localhost:8000/medical_documentation?` +
      new URLSearchParams({
        user_id: String(patientId),
      }),
    {
      method: "GET",
      cache: "no-store",
    }
  );

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

// type MedicalDocumentationProps = {
//   params: {
//     id: number;
//   };
// };

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

      <LinkButton
        linkProps={{
          href: `/medical-documentation/${medicalDocumentation.id}/entry/new`,
        }}
      >
        Add new medical documentation entry
      </LinkButton>
    </Container>
  );
}
