import * as React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import LoadCase from "../components/LoadCase.js";
import FormFields from "../components/FormFields.js";
import ButtonUpdateCase from "../components/ButtonUpdateCase";
import ButtonStateUpdate from "../components/ButtonStateUpdate";

export default function OperatorDialog({ open, onClose }) {
  const [freeAmbulances, setFreeAmbulances] = useState("");
  const [loadedHospital, setLoadedHospital] = useState("");

  const [waiting, setWaiting] = useState("");
  const [caseInfo, setCaseInfo] = useState({});
  const [patientInit, setPatientInit] = useState({
    name: " ",
    condition: " ",
    information: " ",
    nhs: " ",
    postcode: " ",
    ambulance: " ",
    gender: " ",
    status: " ",
  });

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ p: 0, textAlign: "center" }}>Hospital</DialogTitle>
        <DialogContent>
          <LoadCase
            setLoadedHospital={setLoadedHospital}
            setCaseInfo={setCaseInfo}
            isAssigned={false}
          ></LoadCase>
          <Divider sx={{ my: 1, pt: 1 }} />
          <FormFields
            setCaseInfo={setCaseInfo}
            caseInfo={caseInfo}
          ></FormFields>
        </DialogContent>
        <DialogActions
          sx={{
            pb: 1,
            justifyContent: "center",
            flexWrap: "wrap-reverse",
          }}
        >
          <Button variant="contained" onClick={onClose} sx={{ m: 1 }}>
            Close
          </Button>
          <ButtonUpdateCase
            caseInfo={caseInfo}
            hospital={loadedHospital}
          ></ButtonUpdateCase>
          <ButtonStateUpdate
            caseInfo={caseInfo}
            hospital={loadedHospital}
            setCaseInfo={setCaseInfo}
            patientInit={patientInit}
            discharge={true}
          ></ButtonStateUpdate>
        </DialogActions>
      </Dialog>
    </div>
  );
}
{
  /* <Stack direction="row" justifyContent={"space-around"} sx={{ mt: 2 }}>
            {(() => {
              if (freeAmbulances > 0)
                return (
                  <Badge badgeContent={freeAmbulances} color="primary">
                    <Chip label="Free Ambulances" />
                  </Badge>
                );
              if (freeAmbulances === "empty")
                return <Chip label="Hospital Empty" color="primary" />;
              if (freeAmbulances === 0)
                return <Chip label="All ambulances busy!" color="primary" />;
            })()}
            {waiting > 0 ? (
              <Badge badgeContent={waiting} color="primary">
                <Chip label="Waiting for Ambulance" />
              </Badge>
            ) : null}
          </Stack> */
}
