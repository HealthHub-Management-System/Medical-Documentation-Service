import { mockReferrals } from "@/src/mocks/mockReferrals";
import { getCurrentUser, snakeToCamel } from "@/src/utils/utils";
import { Container, Typography } from "@mui/material";
import ReferralCard from "./ReferralCard";
import { Referral } from "@/src/models/referral";
import { LinkButton } from "../components/LinkButton";
import { cookies } from "next/headers";

const getReferrals = async (patientId: string) => {
  const res = await fetch(
    `http://localhost:8000/referrals?` +
      new URLSearchParams({
        patient_id: patientId,
      }),
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (res.ok) return snakeToCamel(await res.json()) as Referral[];
  else console.error("Failed to fetch referrals:", res.statusText);

  return (
    mockReferrals.filter((referral) => referral.patientId === patientId) ?? null
  );
};

export default async function Page() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie) return;
  const currentUser = await getCurrentUser(sessionCookie);
  const referrals = await getReferrals(currentUser.id);

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
        Referrals for user {currentUser.name}
      </Typography>
      {referrals.map((referral) => {
        return <ReferralCard key={referral.id} referral={referral} />;
      })}

      <LinkButton linkProps={{ href: `/referrals/new` }}>
        Add new referral
      </LinkButton>
    </Container>
  );
}
