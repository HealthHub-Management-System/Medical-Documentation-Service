"use client";

import { mockPrescriptions } from "@/src/mocks/mockPrescriptions";
import { getCurrentUserClient, snakeToCamel } from "@/src/utils/utils";
import { Container, Typography } from "@mui/material";
import { PrescriptionCard } from "./PrescriptionCard";
import { Prescription } from "@/src/models/prescription";
import { LinkButton } from "../components/LinkButton";
import { User } from "@/src/models/user";
import { useState, useEffect } from "react";

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

export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    getCurrentUserClient().then((u) => setCurrentUser(u));
  }, []);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  useEffect(() => {
    if (!currentUser) return;
    getPrescriptions(currentUser.id).then((r) => setPrescriptions(r));
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
          Prescriptions for user {currentUser.name}
        </Typography>
        {prescriptions.map((prescription) => {
          return (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          );
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
        <LinkButton linkProps={{ href: `/prescriptions/new` }}>
          Add new prescription
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
