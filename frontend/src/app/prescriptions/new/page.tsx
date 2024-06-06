"use client";

import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Autocomplete,
  Paper,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Prescription, NewPrescriptionForm } from "@/src/models/prescription";
import { camelToSnake, getCurrentUser } from "@/src/utils/utils";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { Drug } from "@/src/models/drug";

const sendNewPrescription = async (
  userId: string,
  newPrescription: Omit<Prescription, "id">
) => {
  const res = await fetch("http://localhost:8003/prescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "patient-id": String(newPrescription.patientId),
      "doctor-id": String(newPrescription.doctorId),
    },
    body: JSON.stringify(camelToSnake(newPrescription)),
  });

  return res.ok;
};

export default function Page() {
  const { control, handleSubmit, getValues, setError, clearErrors } = useForm<NewPrescriptionForm>({});
  const [drugSuggestions, setDrugSuggestions] = useState<string[]>([]);

  const fetchDrugSuggestions = async () => {
    try {
      const response = await fetch(`http://localhost:8000/drugs?name=${getValues("drugName")}`);
      if (response.status === 404) {
        setError("drugName", {
          type: "manual",
          message: "Drug not found",
        });
        setDrugSuggestions([]);
      } else {
        const data = await response.json() as Drug[];
        const drugNames = data.map((drug) => drug.name);
        setDrugSuggestions(drugNames);
        clearErrors("drugName");
      }
    } catch (error) {
      setError("drugName", {
        type: "manual",
        message: "Error fetching drugs",
      });
    }
  };

  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie) return;

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
      <Typography variant="h4">Add new prescription</Typography>

      <Card>
        <form
          onSubmit={handleSubmit(async (values) => {
            console.debug(values);
            const currentUser = await getCurrentUser(sessionCookie);
            await sendNewPrescription(currentUser.id, values);
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
                  type="number"
                  sx={{ m: 1, width: 300 }}
                  label="Doctor"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="patientId"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Patient"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="drugName"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  options={drugSuggestions}
                  sx={{ m: 1, width: 300 }}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Drug" 
                      error={!!fieldState.error}
                      helperText={fieldState.error ? fieldState.error.message : ""}
                    />
                  )}
                  noOptionsText=""
                  PaperComponent={({ children }) => 
                    drugSuggestions.length === 0 ? null : <Paper>{children}</Paper>
                  }
                  onInputChange={(event, value) => {
                    field.onChange(value);
                    fetchDrugSuggestions();
                  }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Description"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
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
