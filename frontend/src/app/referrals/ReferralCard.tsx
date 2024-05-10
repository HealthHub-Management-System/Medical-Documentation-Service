import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Referral } from "@/src/models/referral";

interface ReferralCardProps {
  referral: Referral;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => {
  return (
    <Card sx={{ m: 1, width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Referral #{referral.id}
        </Typography>
        <Typography variant="body1" component="p">
          Doctor ID: {referral.doctorId}
        </Typography>
        <Typography variant="body1" component="p">
          Patient ID: {referral.patientId}
        </Typography>
        <Typography variant="body1" component="p">
          Description: {referral.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReferralCard;
