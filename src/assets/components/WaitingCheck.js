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
import ButtonDischargeCase from "./ButtonStateUpdate";

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
}
