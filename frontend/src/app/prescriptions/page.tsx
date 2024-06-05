import { mockPrescriptions } from "@/src/mocks/mockPrescriptions";
import { getCurrentUser, snakeToCamel } from "@/src/utils/utils";
import { Container, Typography } from "@mui/material";
import { PrescriptionCard } from "./PrescriptionCard";
import { Prescription } from "@/src/models/prescription";
import { LinkButton } from "../components/LinkButton";
import { cookies } from "next/headers";

const getPrescriptions = async (patientId: string) => {
  const res = await fetch(
    `http://localhost:8000/prescriptions?` +
      new URLSearchParams({
        patient_id: patientId,
      }),
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (res.ok) return snakeToCamel(await res.json()) as Prescription[];
  else console.error("Failed to fetch prescriptions:", res.statusText);

  return (
    mockPrescriptions.filter(
      (prescription) => prescription.patientId === patientId
    ) ?? null
  );
};

export default async function Page() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie) return;
  const currentUser = await getCurrentUser(sessionCookie);
  const prescriptions = await getPrescriptions(currentUser.id);

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
        Prescriptions for user {currentUser.name}
      </Typography>
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
