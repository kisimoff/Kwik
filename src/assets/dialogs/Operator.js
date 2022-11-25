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
import { db } from "../../firebase.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default function OperatorDialog({ open, onClose }) {
  const patientDataInit = {
    status: "",
    name: "",
    nhs: "",
    postcode: "",
    gender: "",
    condition: "",
    information: "",
  };

  const ambulanceInit = {
    free: true,
    case: "",
  };

  const hospRefStich = doc(db, "Hospitals", "Hospital In Stitches"); //postcode - 1
  const hospRefFinal = doc(db, "Hospitals", "Hospital Final Destination"); // postcode -2
  const hospRefAll = doc(db, "Hospitals", "Hospital The All Nighters"); // poscode - 3
  const [assignedHospital, setAssignedHospital] = useState("");
  const [checkButton, setCheckButton] = useState("Query");

  const [patientData, setPatientData] = useState(patientDataInit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  //had trouble syncronising the async functions, thats the only working scenario to assing status to each patient. To be improved
  useEffect(() => {
    if (patientData.postcode === "3") {
      writeToDb(hospRefAll);
      setAssignedHospital("Hospital The All Nighters");
      console.log("Writing");
      setPatientData(patientDataInit);
    }
    if (patientData.postcode === "2") {
      writeToDb(hospRefFinal);
      setAssignedHospital("Hospital Final Destination");
      console.log("Writing");
      setPatientData(patientDataInit);
    }
    if (patientData.postcode === "1") {
      writeToDb(hospRefStich);
      setAssignedHospital("Hospital In Stitches");
      console.log("Writing");
      setPatientData(patientDataInit);
    }
  }, [patientData.status]);

  var numberOfAmbulances = 3; //just change the var to alter the number of ambulances

  async function addAmbulances(collection3) {
    const docRef = doc(collection3, "Ambulances", "Ambulance1"); //trying to get ambulance 1
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    } else {
      console.log("Creating Ambulances");
      for (let i = 1; i <= numberOfAmbulances; i++) {
        await setDoc(
          doc(collection3, "Ambulances", `Ambulance${i}`),
          ambulanceInit
        );
      }
    }

    const casesRef = collection(collection3, "Ambulances");

    const q = query(casesRef, where("free", "==", true));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setPatientData({
        ...patientData,
        status: "waiting",
      });
      console.log(patientData);
      console.log("No ambulances avaliable.");
    } else {
      const assigned = "assigned";
      setPatientData({
        ...patientData,
        status: assigned,
      });
      console.log("Ambulances free:", querySnapshot.size);
      const firstFree = querySnapshot.docs[0].id;
      console.log("first free:", firstFree);

      console.log(patientData);
      const ambulanceToAssign = doc(collection3, "Ambulances", firstFree);
      await updateDoc(ambulanceToAssign, {
        free: false,
        case: patientData.nhs,
      });
    }
  }

  async function checkPatient() {
    const docRef = doc(db, "Patients", patientData.nhs);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPatientData({
        name: docSnap.data().name,
        nhs: docSnap.data().nhs,
        condition: docSnap.data().condition,
        information: docSnap.data().information,
        postcode: docSnap.data().postcode,
        ambulance: " ",
        gender: docSnap.data().gender,
        status: " ",
      });
      setCheckButton("Found");
    } else {
      setCheckButton("Empty");
      console.log("No such document!");
    }
  }

  async function formSubmit(event) {
    event.preventDefault();

    if (patientData.postcode === "3") {
      setAssignedHospital("Hospital The All Nighters");
      await addAmbulances(hospRefAll);
    }
    if (patientData.postcode === "2") {
      setAssignedHospital("Hospital Final Destination");
      await addAmbulances(hospRefFinal);
    }
    if (patientData.postcode === "1") {
      setAssignedHospital("Hospital In Stitches");
      await addAmbulances(hospRefStich);
    }
    await setDoc(doc(db, "Patients", patientData.nhs), patientData);
  }

  async function writeToDb(hospDb) {
    await setDoc(doc(hospDb, "Cases", patientData.nhs), patientData);
  }
  function report(event) {
    formSubmit(event);
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={report}>
          <DialogTitle sx={{ m: 0, p: 1, textAlign: "center" }}>
            Operator
          </DialogTitle>
          <DialogContent>
            <Stack direction="row" justifyContent="space-between">
              <TextField
                sx={{ width: "70%", pr: "1" }}
                required
                id="outlined-name"
                margin="dense"
                label="NHS Number"
                name="nhs"
                InputLabelProps={{
                  shrink: true,
                }}
                value={patientData.nhs}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => {
                        checkPatient();
                      }}
                      variant="contained"
                      size="small"
                      sx={{ width: "20%" }}
                    >
                      {checkButton}
                    </Button>
                  ),
                }}
              />{" "}
              <TextField
                sx={{ width: "29%" }}
                id="outlined-name"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Postcode"
                name="postcode"
                value={patientData.postcode}
                onChange={handleInputChange}
              />
            </Stack>

            <Stack direction="row">
              <TextField
                sx={{ pr: 1, width: "50%" }}
                id="outlined-name"
                margin="dense"
                label="Name"
                name="name"
                value={patientData.name}
                onChange={handleInputChange}
              />

              <FormControl margin="dense" sx={{ width: "50%" }}>
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
              label="Condition and Information"
              name="condition"
              value={patientData.condition}
              multiline
              rows={2}
              onChange={handleInputChange}
            />
          </DialogContent>

          <DialogActions sx={{ mt: -2, pb: 1, justifyContent: "center" }}>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => alert("submitted!")}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
