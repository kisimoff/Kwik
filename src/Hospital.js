import * as React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import ambulance from "./amgif.gif";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Autocomplete from "@mui/material/Autocomplete";
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function OperatorDialog({ open, onClose }) {
  const [name, setName] = React.useState("");
  const [patient, setPatient] = React.useState("");
  const [patientId, setPatientId] = React.useState("");
  const [patientLoad, setPatientLoad] = useState({
    name: " ",
    condition: "empty",
    information: "empty",
    nhs: " ",
    postcode: " ",
    ambulance: " ",
    gender: " ",
  });
  const [gender, setGender] = React.useState("");

  const [casePatient, setCasePatient] = useState({
    name: "",
    condition: "",
    information: "",
    nhs: "",
    postcode: "",
    ambulance: "",
    gender: "",
  });

  const [nhs, setNhs] = React.useState("");
  const [alignment, setAlignment] = React.useState("left");
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const [names, setNames] = useState(["John Doe"]);

  const hospitals = [
    "Hospital Final Destination",
    "Hospital In Stitches",
    "Hospital The All Nighters",
  ];

  const [value, setValue] = React.useState(hospitals[0]);
  const [inputValue, setInputValue] = React.useState(" ");

  const [value2, setValue2] = React.useState(names[0]);

  const hosppRef = collection(db, "Hospitals");

  const messageRef = collection(
    db,
    "Hospitals",
    'Hospital "Final Destination"',
    "Cases"
  );

  function Printme() {
    {
      onSnapshot(messageRef, (snapshot) =>
        setNames(snapshot.docs.map((doc) => doc.data().name))
      );
    }
  }

  const handleSelectGender = (event) => {
    setGender(event.target.value);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const handleNhsInput = (event) => {
    setNhs(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientLoad({
      ...patientLoad,
      [name]: value,
    });
  };

  const [personName, setPersonName] = React.useState([]);

  function loadCasesFor(newInputValue) {
    const path = `/Hospitals/${newInputValue}/Cases`;
    const messageRef1 = collection(db, path);
    onSnapshot(messageRef1, (snapshot) =>
      // setCasePatient({
      //   name: snapshot.docs.map((doc) => doc.data().name),
      //   id: snapshot.docs.map((doc) => doc.data().name),
      // })

      // setNames(snapshot.docs.map((doc) => doc.data().name))
      setNames(snapshot.docs.map((doc) => doc.id))
    );
    console.log(names);
    setValue2(casePatient.name[0]);
  }
  async function updateInfo() {
    const docRef = doc(db, `/Hospitals/${inputValue}/Cases`, patientLoad.nhs);
    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      name: patientLoad.name,
      condition: patientLoad.condition,
      gender: patientLoad.gender,
    });
  }
  async function loadPatientInfo(value2) {
    const docRef = doc(db, `/Hospitals/${inputValue}/Cases`, value2);
    console.log(docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Found!", docSnap.data().name);

      setPatientLoad({
        name: docSnap.data().name,
        nhs: docSnap.data().nhs,
        condition: docSnap.data().condition,
        information: docSnap.data().information,
        postcode: docSnap.data().postcode,
        ambulance: docSnap.data().ambulance,
        gender: docSnap.data().gender,
      });
      console.log(patientLoad);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ m: 0, p: 1, textAlign: "center" }}>
          Hospital
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" justifyContent={"space-around"} sx={{ my: 2 }}>
            <Badge badgeContent={4} color="primary">
              <Chip label="Free Ambulances" />
            </Badge>

            <Badge badgeContent={4} color="primary">
              <Chip label="Waiting for Ambulance" />
            </Badge>
          </Stack>

          <Autocomplete
            id="controllable-states-demo"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              console.log(newInputValue);
              loadCasesFor(newInputValue);
            }}
            options={hospitals}
            sx={{ py: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Hospital" />
            )}
          />

          <Stack direction="row">
            <Autocomplete
              id="combo-box-demo"
              options={names}
              value={patient}
              onChange={(event, newValue) => {
                setPatient(newValue);
              }}
              disablePortal
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Case" />
              )}
            />

            <Button
              sx={{ width: "30%" }}
              onClick={() => loadPatientInfo(patient)}
              variant="contained"
            >
              Load
            </Button>
          </Stack>

          <p style={{ margin: 0, padding: 5, textAlign: "center" }}>
            Patient Information
          </p>
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
              sx={{ pr: 1 }}
              id="outlined-name"
              margin="dense"
              label="NHS Number"
              InputProps={{
                readOnly: true,
              }}
              name={"nhs"}
              value={patientLoad.nhs}
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
            name={"condition"}
            onChange={handleInputChange}
          />
          {/* <Stack direction="row" sx={{ justifyContent: "center" }}>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <img src={ambulance} className="amgif" alt="Ambulance" />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <img src={ambulance} className="amgif" alt="Ambulance" />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <img src={ambulance} className="amgif" alt="Ambulance" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack> */}
        </DialogContent>
        <DialogActions sx={{ mt: -2, pb: 1, justifyContent: "center" }}>
          {/* <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Patient is not dead"
          /> */}
          <Button variant="contained" onClick={Printme}>
            Close
          </Button>

          <Button variant="contained" onClick={onClose}>
            Discharge
          </Button>

          <Button variant="contained" onClick={updateInfo}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
