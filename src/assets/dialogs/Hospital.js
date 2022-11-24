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
import { db } from "../../firebase.js";
import LoadCase from "../components/LoadCase.js";
import FormFields from "../components/FormFields.js";
import ButtonUpdateCase from "../components/ButtonUpdateCase";
import ButtonDischargeCase from "../components/ButtonStateUpdate";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import ButtonStateUpdate from "../components/ButtonStateUpdate";

export default function OperatorDialog({ open, onClose }) {
  const [freeAmbulances, setFreeAmbulances] = React.useState("");
  const [loadedHospital, setLoadedHospital] = React.useState("");

  const [waiting, setWaiting] = React.useState("");
  const [caseInfo, setCaseInfo] = React.useState({});
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
  const [patientLoad, setPatientLoad] = useState(patientInit);

  const [names, setNames] = useState(["John Doe"]);

  const hospitals = [
    "Hospital Final Destination",
    "Hospital In Stitches",
    "Hospital The All Nighters",
  ];

  const [inputValue, setInputValue] = React.useState(" ");

  // async function updateFreeState(newInputValue) {
  //   //need to do the queries after
  //   const path = `/Hospitals/${newInputValue}/Ambulances`;
  //   const ambulanceRef = collection(db, path);

  //   const qtrue = query(ambulanceRef, where("free", "==", true));
  //   const qfalse = query(ambulanceRef, where("free", "==", false));

  //   const querySnapshotTrue = await getDocs(qtrue);
  //   const querySnapshotFalse = await getDocs(qfalse);

  //   const path2 = `/Hospitals/${newInputValue}/Cases`;
  //   const messageRef1 = collection(db, path2);

  //   const qWaitingCases = query(messageRef1, where("status", "==", "waiting"));
  //   const querySnapshotWaitingCases = await getDocs(qWaitingCases);

  //   if (querySnapshotWaitingCases.size > 0 && querySnapshotTrue.size > 0) {
  //     const firstFree = querySnapshotTrue.docs[0].id;

  //     const ambulanceToAssign = doc(db, path, firstFree);
  //     const patientToAssing = doc(
  //       db,
  //       `/Hospitals/${newInputValue}/Cases`,
  //       querySnapshotWaitingCases.docs[0].id
  //     );

  //     await updateDoc(ambulanceToAssign, {
  //       free: false,
  //       case: querySnapshotWaitingCases.docs[0].id,
  //     });

  //     await updateDoc(patientToAssing, {
  //       status: "assigned",
  //     });
  //     setWaiting(querySnapshotWaitingCases.size);
  //   }

  //   if (querySnapshotTrue.size === 0 && querySnapshotFalse.size === 0) {
  //     console.log("empty");
  //     setFreeAmbulances("empty");
  //   } else {
  //     setFreeAmbulances(querySnapshotTrue.size);
  //   }
  // }

  // async function disCharge() {
  //   //todo: update waiting state properly
  //   const docRef2 = doc(db, "Patients", patientLoad.nhs);
  //   await updateDoc(docRef2, {
  //     name: patientLoad.name,
  //     condition: patientLoad.condition,
  //     gender: patientLoad.gender,
  //     //information: patientLoad.information,
  //     status: "discharged",
  //     hisotry: "Discharged from: " + inputValue + " at: " + Date(),
  //   });
  //   await deleteDoc(doc(db, `/Hospitals/${inputValue}/Cases`, patientLoad.nhs));
  //   await freeUpAmbulance();
  //   await updateFreeState(inputValue);
  //   setPatientLoad(patientInit);
  //   // have to free up ambulance, state - free, case "" , if waiting > 0 assign first waiting
  // }

  // async function freeUpAmbulance() {
  //   const ambulanceRef = collection(db, `/Hospitals/${inputValue}/Ambulances`);
  //   const q = query(ambulanceRef, where("case", "==", patientLoad.nhs));
  //   const querySnapshot = await getDocs(q);
  //   const firstFree = querySnapshot.docs[0].id;
  //   const ambulanceToFree = doc(
  //     db,
  //     `/Hospitals/${inputValue}/Ambulances`,
  //     firstFree
  //   );
  //   await updateDoc(ambulanceToFree, {
  //     free: true,
  //     case: " ",
  //   });

  //   setPatientLoad(patientInit);
  // }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ mb: -2, p: 0, pt: 0.5, textAlign: "center" }}>
          Hospital
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" justifyContent={"space-around"} sx={{ mt: 2 }}>
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
          </Stack>
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
          {/* 
          <Stack direction="row">
            <TextField
              sx={{ pr: 1 }}
              id="outlined-name"
              margin="dense"
              label="Name"
              name={"name"}
              value={patientLoad.name}
              onChange={handleInputChange}
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={patientLoad.gender}
                label="Gender"
                name={"gender"}
                onChange={handleInputChange}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Felmale"}>Female</MenuItem>
                <MenuItem value={"Agender"}>Agender</MenuItem>
                <MenuItem value={"Bigender"}>Bigender</MenuItem>
                <MenuItem value={"Cisgender"}>Cisgender</MenuItem>
                <MenuItem value={"Gender Fluid"}>Gender Fluid</MenuItem>
                <MenuItem value={"Genderqueer"}>Genderqueer</MenuItem>
                <MenuItem value={"Gender Variant"}>Gender Variant</MenuItem>
                <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
                <MenuItem value={"Third Gender"}>Third Gender</MenuItem>
                <MenuItem value={"Transgender"}>Transgender</MenuItem>
                <MenuItem value={"UFO"}>UFO</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row">
            <TextField
              sx={{ pr: 1, width: "50%" }}
              id="outlined-name"
              margin="dense"
              label="NHS Number"
              InputProps={{
                readOnly: true,
              }}
              name={"nhs"}
              value={caseInfo.nhs}
            />{" "}
            <TextField
              id="outlined-name"
              margin="dense"
              name={"postcode"}
              InputProps={{
                readOnly: true,
              }}
              label="Postcode"
              value={patientLoad.postcode}
            />
            <TextField
              sx={{ ml: 1 }}
              id="outlined-status"
              margin="dense"
              label="Status"
              name={"status"}
              value={patientLoad.status}
              onChange={handleInputChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
          <TextField
            id="outlined-name"
            fullWidth
            margin="dense"
            label="Medical Condition"
            value={patientLoad.condition}
            name={"condition"}
            multiline
            rows={2}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-name"
            fullWidth
            margin="dense"
            label="Additonal Information"
            value={patientLoad.information}
            name={"information"}
            onChange={handleInputChange}
          /> */}
        </DialogContent>
        <DialogActions sx={{ mt: -2, pb: 1, justifyContent: "center" }}>
          {/* <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Patient is not dead"
          /> */}
          <Button variant="contained" onClick={onClose} sx={{ m: 1 }}>
            Close
          </Button>

          {/* <Button variant="contained">Discharge</Button> */}

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
