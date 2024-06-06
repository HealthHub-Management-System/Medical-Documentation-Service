import React, { use, useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Prescription } from "@/src/models/prescription";
import { list } from "postcss";
import { listDoctors, listPatients } from "@/src/utils/utils";

interface PrescriptionCardProps {
  prescription: Prescription;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
}) => {
  const [doctorName, setDoctorName] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");

  useEffect(() => {
    const fetchDoctorName = async () => {
      const doctors = await listDoctors()
      const doctor = doctors.find((doctor) => doctor.id === prescription.doctorId);
      if (doctor) {
        setDoctorName(doctor.name);
      }
    }
    const fetchPatientName = async () => {
      const patients = await listPatients();
      const patient = patients.find((patient) => patient.id === prescription.patientId);
      if (patient) {
        setPatientName(patient.name);
      }
    }

    fetchDoctorName();
    fetchPatientName();
  }, []);

  return (
    <Card sx={{ m: 1, width: "100%" }} className="prescription-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          Prescription #{prescription.id}
        </Typography>
        <Typography variant="body1" component="p">
          Doctor: {doctorName}
        </Typography>
        <Typography variant="body1" component="p">
          Patient: {patientName}
        </Typography>
        <Typography variant="body1" component="p">
          Description: {prescription.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
