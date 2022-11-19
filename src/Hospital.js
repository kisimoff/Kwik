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
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export default function OperatorDialog({ open, onClose }) {
  const [name, setName] = React.useState("");

  const [gender, setGender] = React.useState("");

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
    "Hospital The All-Nighters",
  ];

  const [value, setValue] = React.useState(hospitals[0]);
  const [inputValue, setInputValue] = React.useState(" ");

  const [value2, setValue2] = React.useState(names[0]);
  const [inputValue2, setInputValue2] = React.useState("");

  const hospRef = collection(db, "Patients");
  const hosppRef = collection(db, "Hospitals");

  const messageRef = collection(
    db,
    "Hospitals",
    'Hospital "Final Destination"',
    "Cases"
  );

  // useEffect(
  //   () =>
  //     onSnapshot(messageRef, (snapshot) =>
  //       setNames(snapshot.docs.map((doc) => doc.data().name))
  //     ),

  //   []
  // );

  const [artists, setArtists] = useState([]);

  let nextId = 0;

  const [docss, loading, error] = useCollectionData(hosppRef);

  function Printme() {
    {
      onSnapshot(messageRef, (snapshot) =>
        setNames(snapshot.docs.map((doc) => doc.data().name))
      );
    }
  }
  function loadCasesFor() {
    const path = `/Hospitals/${inputValue}/Cases`;
    const messageRef1 = collection(db, path);
    onSnapshot(messageRef1, (snapshot) =>
      setNames(snapshot.docs.map((doc) => doc.data().name))
    );
    console.log(names);
    setValue2(names[0]);
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

  const [personName, setPersonName] = React.useState([]);

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const [hospitalName, setHospitalName] = useState([""]);
  const handleHospitalSelect = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setHospitalName(value);

    const hos = hospitalName.join("").toString();
    loadCasesFor(hos);
  };
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
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              loadCasesFor();
            }}
            id="controllable-states-demo"
            options={hospitals}
            sx={{ py: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Hospital" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={names}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Case" />
            )}
          />
          {/* <Autocomplete
            value={value2}
            onChange={(event, newValue) => {
              setNames(newValue);
            }}
            inputValue={inputValue2}
            onInputChange={(event, newInputValue) => {
              setInputValue2(newInputValue);
            }}
            id="controllable-states-demo"
            options={names}
            sx={{ py: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Case" />
            )}
          /> */}

          <p style={{ margin: 0, padding: 5, textAlign: "center" }}>
            Patient Information
          </p>

          <Stack direction="row">
            <TextField
              sx={{ pr: 1 }}
              id="outlined-name"
              margin="dense"
              label="Name"
              value={name}
              onChange={handleNameInput}
            />
            <TextField
              id="outlined-name"
              margin="dense"
              label="NHS Number"
              value={nhs}
              onChange={handleNhsInput}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              sx={{ pr: 1 }}
              id="outlined-name"
              margin="dense"
              label="Postcode"
              value={nhs}
              onChange={handleNhsInput}
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleSelectGender}
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
            value={nhs}
            multiline
            rows={2}
            onChange={handleNhsInput}
          />
          <Stack direction="row" sx={{ justifyContent: "center" }}>
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
          </Stack>
        </DialogContent>
        <DialogActions sx={{ mt: -2, pb: 1, justifyContent: "center" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Patient is not dead"
          />
          <Button onClick={Printme}>Abort</Button>
          <Button onClick={onClose}>Assign</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
