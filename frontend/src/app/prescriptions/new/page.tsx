"use client";

import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Prescription, NewPrescriptionForm } from "@/src/models/prescription";

const sendNewPrescription = async (newEntry: Omit<Prescription, "id">) => {
  // TODO logic for doing HTTP POST request to send
  // new medical documentation entry
};

type PrescriptionNewProps = {
  params: {
    id: number;
  };
};

export default function Page({ params }: PrescriptionNewProps) {
  const { control, handleSubmit } = useForm<NewPrescriptionForm>({});
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
        Add new medical documentation entry for medical documentation{" "}
        {params.id}
      </Typography>

      <Card>
        <form
          onSubmit={handleSubmit(async (values) => {
            console.debug(values);
            await sendNewPrescription(values);
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
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1 }}
                  label="Diagnose"
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
