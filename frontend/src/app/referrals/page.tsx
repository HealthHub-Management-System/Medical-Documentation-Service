import { mockReferrals } from "@/src/mocks/mockReferrals";
import { getCurrentUserId } from "@/src/utils/utils";
import { Container, Typography } from "@mui/material";
import ReferralCard from "./ReferralCard";

const getReferrals = async (patientId: number) => {
  // TODO logic for fetching this data from the backend

  return (
    mockReferrals.filter((referral) => referral.patientId === patientId) ?? null
  );
};

export default async function Page() {
  const userId = getCurrentUserId();
  const referrals = await getReferrals(userId);

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
      <Typography variant="h4">Referrals for user {userId}</Typography>
      {referrals.map((referral) => {
        return <ReferralCard key={referral.id} referral={referral} />;
      })}
    </Container>
  );
}
