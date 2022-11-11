import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { height } from "@mui/system";
import babi from "./babi.jpg";

import { db } from "./firebase.js";
import { collection, addDoc } from "@firebase/firestore";

export default function OperatorDialog({ open, onClose }) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [name, setName] = React.useState("");

  const [gender, setGender] = React.useState("");

  const [nhs, setNhs] = React.useState("");

  const handleSelectGender = (event) => {
    setGender(event.target.value);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const handleNhsInput = (event) => {
    setNhs(event.target.value);
  };

  async function handleSubmit() {
    //writing to firabase
    await addDoc(collection(db, "todos"), data);
  }

  const data = {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  };

  // Add a new document in collection "cities" with ID 'LA'

  async function handleSubmit2() {
    //writing to firabase
    await addDoc(collection(db, "todos"), {
      title: "Example",
    });
  }

  return (
    <div>
      <img src={babi} className="babi" alt="Ambulance" />

      <Dialog open={open} onClose={onClose}>
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
        </DialogContent>

        <DialogActions sx={{ mt: -2, pb: 1, justifyContent: "center" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Patient is not dead"
          />
          <Button onClick={handleSubmit2}>Abort</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
