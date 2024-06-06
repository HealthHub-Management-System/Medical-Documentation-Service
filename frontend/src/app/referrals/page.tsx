"use client";

import { mockReferrals } from "@/src/mocks/mockReferrals";
import { getCurrentUserClient, snakeToCamel } from "@/src/utils/utils";
import { Container, Typography } from "@mui/material";
import ReferralCard from "./ReferralCard";
import { Referral } from "@/src/models/referral";
import { LinkButton } from "../components/LinkButton";
import { useEffect, useState } from "react";
import { User } from "@/src/models/user";

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

export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    getCurrentUserClient().then((u) => setCurrentUser(u));
  }, []);

  const [referrals, setReferrals] = useState<Referral[]>([]);
  useEffect(() => {
    if (!currentUser) return;
    getReferrals(currentUser.id).then((r) => setReferrals(r));
  }, [currentUser]);

  if (!currentUser) return null;

  if (currentUser.role === "patient") {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">
          Referrals for user {currentUser.name}
        </Typography>
        {referrals.map((referral) => {
          return <ReferralCard key={referral.id} referral={referral} />;
        })}
      </Container>
    );
  }

  if (currentUser.role === "doctor") {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinkButton linkProps={{ href: `/referrals/new` }}>
          Add new referral
        </LinkButton>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
