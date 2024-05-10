import { mockPrescriptions } from "@/src/mocks/mockPrescriptions";
import { getCurrentUserId, snakeToCamel } from "@/src/utils/utils";
import { Container, Typography } from "@mui/material";
import { PrescriptionCard } from "./PrescriptionCard";
import { Prescription } from "@/src/models/prescription";
import { LinkButton } from "../components/LinkButton";

const getPrescriptions = async (patientId: number) => {
  const res = await fetch("http://localhost:8000/prescriptions", {
    headers: {
      "patient-id": String(patientId),
    },
    method: "GET",
    cache: "no-store",
  });

  if (res.ok) return snakeToCamel(await res.json()) as Prescription[];
  else console.error("Failed to fetch prescriptions:", res.statusText);

  return (
    mockPrescriptions.filter(
      (prescription) => prescription.patientId === patientId
    ) ?? null
  );
};

export default async function Page() {
  const userId = getCurrentUserId();
  const prescriptions = await getPrescriptions(1);

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
      <Typography variant="h4">Prescriptions for user {userId}</Typography>
      {prescriptions.map((prescription) => {
        return (
          <PrescriptionCard key={prescription.id} prescription={prescription} />
        );
      })}

      <LinkButton linkProps={{ href: `/prescriptions/new` }}>
        Add new prescription
      </LinkButton>
    </Container>
  );
}
