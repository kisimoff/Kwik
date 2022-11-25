import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import LoadCase from "../components/LoadCase.js";
import FormFields from "../components/FormFields.js";
import ButtonUpdateCase from "../components/ButtonUpdateCase";
import ButtonStateUpdate from "../components/ButtonStateUpdate";

export default function OperatorDialog({ open, onClose }) {
  const [loadedHospital, setLoadedHospital] = useState("");
  const [caseInfo, setCaseInfo] = useState({});
  const [patientInit, setPatientInit] = React.useState({
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
        <DialogTitle sx={{ mb: -2, p: 0, pt: 0.5, textAlign: "center" }}>
          Ambulance
        </DialogTitle>
        <DialogContent>
          <LoadCase
            setLoadedHospital={setLoadedHospital}
            setCaseInfo={setCaseInfo}
            isAssigned={true}
          ></LoadCase>
          <Divider sx={{ my: 1, pt: 1 }} />
          <FormFields
            setCaseInfo={setCaseInfo}
            caseInfo={caseInfo}
          ></FormFields>
        </DialogContent>
        <DialogActions
          sx={{
            p: 1,
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
            discharge={false}
          ></ButtonStateUpdate>
        </DialogActions>
      </Dialog>
    </div>
  );
}
