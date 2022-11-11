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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ambulance from "./amgif.gif";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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

  const [alignment, setAlignment] = React.useState("left");
  const [devices, setDevices] = React.useState(() => ["phone"]);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const hospitals = [
    'Hospital "Final Destination"',
    'Hospital "In Stitches"',
    'Hospital "The All-Nighters"',
  ];
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
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
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ m: 0, p: 1, textAlign: "center" }}>
          Hospital
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" justifyContent="space-around">
            <p>Select Hospital</p>
            <p>Active Cases</p>
          </Stack>

          <Stack direction="row" justifyContent="space-around">
            <Select
              sx={{ mr: 1 }}
              multiple
              native
              value={personName}
              // @ts-ignore Typings are not considering `native`
              onChange={handleChangeMultiple}
              inputProps={{
                id: "select-multiple-native",
              }}
            >
              {hospitals.map((hospitals) => (
                <option key={hospitals} value={hospitals}>
                  {hospitals}
                </option>
              ))}
            </Select>

            <Select
              multiple
              native
              value={personName}
              // @ts-ignore Typings are not considering `native`
              onChange={handleChangeMultiple}
              inputProps={{
                id: "select-multiple-native",
              }}
            >
              {names.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
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
          <Button onClick={onClose}>Abort</Button>
          <Button onClick={onClose}>Assign</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
