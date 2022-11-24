import * as React from "react";
import { useState } from "react";

import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

export default function FormFields({ setCaseInfo, caseInfo }) {
  const [loadCaseResponse, setLoadCaseResponse] = React.useState({});
  const [patientInit, setPatientInit] = React.useState({
    name: " ",
    gender: " ",
    condition: " ",
    information: " ",
    nhs: " ",
    postcode: " ",
    ambulance: " ",
    status: " ",
  });
  if (isObjectEmpty(caseInfo)) {
    setCaseInfo(patientInit);
  } else {
    setCaseInfo(caseInfo);
  }

  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseInfo({
      ...caseInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <Stack direction="row">
        <TextField
          sx={{ pr: 1, width: "60%" }}
          id="outlined-name"
          margin="dense"
          label="Name"
          name={"name"}
          value={caseInfo.name}
          onChange={handleInputChange}
        />
        <FormControl margin="dense" sx={{ width: "40%" }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={caseInfo.gender}
            label="Gender"
            name={"gender"}
            onChange={handleInputChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Empty"}>Empty</MenuItem>
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
          value={caseInfo.postcode}
        />
        <TextField
          sx={{ ml: 1 }}
          id="outlined-status"
          margin="dense"
          label="Status"
          name={"status"}
          value={caseInfo.status}
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
        value={caseInfo.condition}
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
        value={caseInfo.information}
        name={"information"}
        onChange={handleInputChange}
      />
    </div>
  );
}
