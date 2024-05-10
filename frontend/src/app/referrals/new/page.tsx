"use client";

import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { NewReferralForm, Referral } from "@/src/models/referral";
import { camelToSnake, getCurrentUserId } from "@/src/utils/utils";

const sendNewPrescription = async (
  userId: number,
  newReferral: Omit<Referral, "id">
) => {
  const res = await fetch("http://localhost:8000/referral", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "patient-id": String(newReferral.patientId),
      "doctor-id": String(newReferral.doctorId),
    },
    body: JSON.stringify(camelToSnake(newReferral)),
  });

  return res.ok;
};

export default function Page() {
  const { control, handleSubmit } = useForm<NewReferralForm>({});
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
      <Typography variant="h4">Add new referral</Typography>

      <Card>
        <form
          onSubmit={handleSubmit(async (values) => {
            console.debug(values);
            await sendNewPrescription(getCurrentUserId(), values);
          })}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Controller
              name="doctorId"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1 }}
                  label="Doctor"
                  {...field}
                  onChange={(diagnose) => field.onChange(diagnose)}
                />
              )}
            />
            <Controller
              name="patientId"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1 }}
                  label="Patient"
                  {...field}
                  onChange={(diagnose) => field.onChange(diagnose)}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1 }}
                  label="Description"
                  {...field}
                  onChange={(diagnose) => field.onChange(diagnose)}
                />
              )}
            />
            <Button variant="contained" type="submit" sx={{ m: 1 }}>
              Submit
            </Button>
          </CardContent>
        </form>
      </Card>
    </Container>
  );
}
