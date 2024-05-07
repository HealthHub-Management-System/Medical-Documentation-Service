"use client";

import {
  MedicalDocumentationEntry,
  NewMedicalDocumentationEntryForm,
} from "@/src/models/medicalDocumentationEntry";
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

const sendNewMedicalDocumentationEntry = async (
  newEntry: Omit<MedicalDocumentationEntry, "id">
) => {
  // TODO logic for doing HTTP POST request to send
  // new medical documentation entry
};

type MedicalDocumentationEntryNewProps = {
  params: {
    id: number;
  };
};

export default function Page({ params }: MedicalDocumentationEntryNewProps) {
  const { control, handleSubmit } = useForm<NewMedicalDocumentationEntryForm>({
    defaultValues: {
      medicalDocumentationId: params.id,
      date: dayjs(),
    },
  });
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
            const { date, ...valuesRest } = values;
            console.debug({ ...valuesRest, date: date.format("DD/MM/YYYY") });

            await sendNewMedicalDocumentationEntry({
              date: date.format("DD-MM-YYYY"),
              ...valuesRest,
            });
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
              name="diagnose"
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
            <Controller
              name="recommendation"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1 }}
                  label="Recommendation"
                  {...field}
                  onChange={(recommendation) => field.onChange(recommendation)}
                />
              )}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ m: 1 }}
                    label="Date"
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                </LocalizationProvider>
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
