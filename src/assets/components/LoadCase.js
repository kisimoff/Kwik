import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { db } from "../../firebase.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function LoadCase({ setCaseInfo, setLoadedHospital }) {
  const [patient, setPatient] = React.useState("");
  const [hospital, setHospital] = React.useState("Hospital Example");
  const [disabled, setDisabled] = React.useState("");
  const [cases, setCases] = useState([]);

  const [patientInit] = React.useState({
    name: " ",
    condition: " ",
    information: " ",
    nhs: " ",
    postcode: " ",
    ambulance: " ",
    gender: " ",
    status: " ",
  });

  const hospitals = [
    "Hospital Final Destination",
    "Hospital In Stitches",
    "Hospital The All Nighters",
  ];

  async function loadCasesFor(newInputValue) {
    const path = `/Hospitals/${newInputValue}/Cases`;
    const messageRef1 = collection(db, path);
    const q = query(messageRef1, where("status", "==", "assigned"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
      setCases([]);
      setDisabled(true);
    } else {
      setDisabled(false);

      querySnapshot.forEach((doc) => {
        setCases((cases) => [...cases, doc.id]);
      });
    }
  }

  async function loadPatientInfo() {
    const docRef = doc(db, `/Hospitals/${hospital}/Cases`, patient);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCaseInfo({
        name: docSnap.data().name,
        nhs: docSnap.data().nhs,
        condition: docSnap.data().condition,
        information: docSnap.data().information,
        postcode: docSnap.data().postcode,
        ambulance: docSnap.data().ambulance,
        gender: docSnap.data().gender,
        status: docSnap.data().status,
      });
    } else {
      console.log("No such document!");
    }
  }

  return (
    <div>
      <Autocomplete
        id="controllable-states-demo"
        disableClearable
        value={hospital}
        onChange={(event, newValue) => {
          setHospital(newValue);
          loadCasesFor(newValue);
          setPatient(" ");
        }}
        options={hospitals}
        sx={{ py: 2 }}
        renderInput={(params) => (
          <TextField {...params} label="Select Hospital" />
        )}
      />
      <Stack direction="row" justifyContent={"space-between"}>
        <Autocomplete
          disableClearable={cases !== null}
          id="combo-box-demo"
          options={cases}
          value={patient}
          onChange={(event, newValue) => {
            setPatient(newValue);
            setCaseInfo(patientInit);
          }}
          label="test"
          disablePortal
          sx={{ width: "68%" }}
          renderInput={(params) => (
            <TextField {...params} label="Select Case" />
          )}
        />

        <Button
          onClick={() => {
            loadPatientInfo();
            setLoadedHospital(hospital);
          }}
          disabled={disabled}
          variant="contained"
          fullWidth="true"
          sx={{ width: "30%" }}
        >
          {disabled ? "Empty" : "Load"}
        </Button>
      </Stack>
    </div>
  );
}
