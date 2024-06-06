"use client";

import { mockMedicalDocumentations } from "@/src/mocks/mockMedicalDocumentations";
import { Container, Typography } from "@mui/material";
import { MedicalDocumentationEntryCard } from "./MedicalDocumentationEntryCard";
import { getCurrentUserClient, snakeToCamel } from "@/src/utils/utils";
import { MedicalDocumentation } from "@/src/models/medicalDocumentation";
import { LinkButton } from "../components/LinkButton";
import { User } from "@/src/models/user";
import { useState, useEffect } from "react";

const getMedicalDocumentation = async (patientId: string) => {
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

export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    getCurrentUserClient().then((u) => setCurrentUser(u));
  }, []);

  const [medicalDocumentation, setMedicalDocumentation] =
    useState<MedicalDocumentation | null>(null);
  useEffect(() => {
    if (!currentUser) return;
    getMedicalDocumentation(currentUser.id).then((r) =>
      setMedicalDocumentation(r)
    );
  }, [currentUser]);

  if (!currentUser) return null;

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
          Medical documentation not found for user {currentUser.name}
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
        Medical documentation for user {currentUser.name}
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
