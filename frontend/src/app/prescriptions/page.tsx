import { mockPrescriptions } from "@/src/mocks/mockPrescriptions";
import { getCurrentUserId } from "@/src/utils/utils";
import { Button, Container, Link, Typography } from "@mui/material";
import { PrescriptionCard } from "./PrescriptionCard";

const getPrescriptions = async (patientId: number) => {
  // TODO logic for fetching this data from the backend

  return (
    mockPrescriptions.filter(
      (prescription) => prescription.patientId === patientId
    ) ?? null
  );
};

export default async function Page() {
  const userId = getCurrentUserId();
  const prescriptions = await getPrescriptions(userId);

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

      <Button sx={{ m: 1 }} variant="contained">
        <Link href={`/prescriptions/new`}>Add new prescription</Link>
      </Button>
    </Container>
  );
}
