import * as React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import babi from "./babi.jpg";
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  limit,
} from "firebase/firestore";

export default function OperatorDialog({ open, onClose }) {
  const data = {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  };

  const patientDataInit = {
    name: "",
    nhs: "",
    postcode: "",
    gender: "",
    condition: "",
    inofrmation: "",
    ambulance: "",
  };

  const ambulanceInit = {
    free: true,
    case: "",
  };

  const casesRef = collection(db, "Patients");
  const hospRefFinal = doc(db, "Hospitals", "Hospital Final Destination");
  const hospRefStich = doc(db, "Hospitals", "Hospital In Stitches");
  const hospRefAll = doc(db, "Hospitals", "Hospital The All Nighters");

  const [patientData, setPatientData] = useState(patientDataInit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  var numberOfAmbulances = 3; //just change the var to alter the number of ambulances
  async function addAmbulances(collection3) {
    const docRef = doc(collection3, "Ambulances", "Ambulance1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    } else {
      // doc.data() will be undefined in this case
      console.log("Creating Ambulances");
      for (let i = 1; i <= numberOfAmbulances; i++) {
        await setDoc(
          doc(collection, "Ambulances", `Ambulance${i}`),
          ambulanceInit
        );
      }
    }

    const casesRef = collection(collection3, "Ambulances");

    const q = query(casesRef, where("free", "==", true));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No ambulances avaliable.");
      setPatientData({
        ...patientData,
        ambulance: "waiting",
      });
    } else {
      console.log("Ambulances free:", querySnapshot.size);
      const firstFree = querySnapshot.docs[0].id;
      console.log("first free:", firstFree);
      const ambulanceToAssign = doc(collection3, "Ambulances", firstFree);
      await updateDoc(ambulanceToAssign, {
        free: false,
        case: patientData.nhs,
      });
      setPatientData({
        ...patientData,
        ambulance: "assigned",
      });
    }
  }

  async function formSubmit(event) {
    event.preventDefault();

    const nhsNumber = patientData.nhs;

    if (patientData.postcode === "3") {
      addAmbulances(hospRefAll);
      await setDoc(doc(hospRefAll, "Cases", nhsNumber), patientData);

      //assignAmbulance(hospRefAll, nhsNumber);
    }
    if (patientData.postcode === "2") {
      addAmbulances(hospRefFinal);
      await setDoc(doc(hospRefFinal, "Cases", nhsNumber), patientData);
    }
    if (patientData.postcode === "1") {
      addAmbulances(hospRefStich);
      await setDoc(doc(hospRefStich, "Cases", nhsNumber), patientData);
    }

    console.log(patientData);
    await addDoc(casesRef, patientData);
    alert(
      "Request recived. Ambulance is coming ASAP. State:",
      patientData.ambulance
    );
    setPatientData(patientDataInit);
  }

  return (
    <div>
      <img src={babi} className="babi" alt="Ambulance" />

      <Dialog open={open} onClose={onClose}>
        <form onSubmit={formSubmit}>
          <DialogTitle sx={{ m: 0, p: 1, textAlign: "center" }}>
            Operator
          </DialogTitle>
          <DialogContent>
            <Stack direction="row">
              <TextField
                sx={{ pr: 1 }}
                id="outlined-name"
                margin="dense"
                label="Name"
                name="name"
                value={patientData.name}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-name"
                margin="dense"
                label="NHS Number"
                name="nhs"
                value={patientData.nhs}
                onChange={handleInputChange}
              />
            </Stack>

            <Stack direction="row">
              <TextField
                sx={{ pr: 1 }}
                id="outlined-name"
                margin="dense"
                label="Postcode"
                name="postcode"
                value={patientData.postcode}
                onChange={handleInputChange}
              />
              <FormControl margin="dense" fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={patientData.gender}
                  label="Gender"
                  name="gender"
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

            <TextField
              id="outlined-name"
              fullWidth
              margin="dense"
              label="Medical Condition"
              name="condition"
              value={patientData.condition}
              multiline
              rows={2}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-name"
              fullWidth
              margin="dense"
              label="Additional Infromation"
              name="infromation"
              value={patientData.information}
              multiline
              rows={2}
              onChange={handleInputChange}
            />
          </DialogContent>

          <DialogActions sx={{ mt: -2, pb: 1, justifyContent: "center" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Patient is not dead"
            />
            <Button onClick={onClose}>Abort</Button>
            <Button type="submit" onClick={onClose}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
