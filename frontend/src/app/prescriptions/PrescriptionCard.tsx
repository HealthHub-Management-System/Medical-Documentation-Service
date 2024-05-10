import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Prescription } from "@/src/models/prescription";

interface PrescriptionCardProps {
  prescription: Prescription;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
}) => {
  return (
    <Card sx={{ m: 1, width: "100%" }} className="prescription-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          Prescription #{prescription.id}
        </Typography>
        <Typography variant="body1" component="p">
          Doctor ID: {prescription.doctorId}
        </Typography>
        <Typography variant="body1" component="p">
          Patient ID: {prescription.patientId}
        </Typography>
        <Typography variant="body1" component="p">
          Description: {prescription.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
