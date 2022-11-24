import * as React from "react";
import Button from "@mui/material/Button";
import { db } from "../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

export default function ButtonUpdateCase({ caseInfo, hospital }) {
  async function updateCaseInfo() {
    const docRef = doc(db, `/Hospitals/${hospital}/Cases`, caseInfo.nhs);
    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      name: caseInfo.name,
      condition: caseInfo.condition,
      gender: caseInfo.gender,
    });
  }

  return (
    <div>
      <Button variant="contained" onClick={updateCaseInfo}>
        Update
      </Button>
    </div>
  );
}
