import * as React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";

import { db } from "../../firebase.js";

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

export default function ButtonHospitaliseCase({
  caseInfo,
  hospital,
  setCaseInfo,
  patientInit,
}) {
  //   const [names, setNames] = useState(["John Doe"]);

  //   const hospitals = [
  //     "Hospital Final Destination",
  //     "Hospital In Stitches",
  //     "Hospital The All Nighters",
  //   ];

  //   async function updateFreeState(newInputValue) {
  //     //need to do the queries after
  //     const path = `/Hospitals/${newInputValue}/Ambulances`;
  //     const ambulanceRef = collection(db, path);

  //     const qtrue = query(ambulanceRef, where("free", "==", true));
  //     const qfalse = query(ambulanceRef, where("free", "==", false));

  //     const querySnapshotTrue = await getDocs(qtrue);
  //     const querySnapshotFalse = await getDocs(qfalse);

  //     const path2 = `/Hospitals/${newInputValue}/Cases`;
  //     const messageRef1 = collection(db, path2);

  //     const qWaitingCases = query(messageRef1, where("status", "==", "waiting"));
  //     const querySnapshotWaitingCases = await getDocs(qWaitingCases);

  //     if (querySnapshotWaitingCases.size > 0 && querySnapshotTrue.size > 0) {
  //       const firstFree = querySnapshotTrue.docs[0].id;

  //       const ambulanceToAssign = doc(db, path, firstFree);
  //       const patientToAssing = doc(
  //         db,
  //         `/Hospitals/${newInputValue}/Cases`,
  //         querySnapshotWaitingCases.docs[0].id
  //       );

  //       await updateDoc(ambulanceToAssign, {
  //         free: false,
  //         case: querySnapshotWaitingCases.docs[0].id,
  //       });

  //       await updateDoc(patientToAssing, {
  //         status: "assigned",
  //       });
  //       setWaiting(querySnapshotWaitingCases.size);
  //     }

  //     if (querySnapshotTrue.size === 0 && querySnapshotFalse.size === 0) {
  //       console.log("empty");
  //       setFreeAmbulances("empty");
  //     } else {
  //       setFreeAmbulances(querySnapshotTrue.size);
  //     }
  //   }

  async function hospitalise() {
    const docRef2 = doc(db, `/Hospitals/${hospital}/Cases`, caseInfo.nhs);
    await updateDoc(docRef2, {
      name: caseInfo.name,
      condition: caseInfo.condition,
      gender: caseInfo.gender,
      //information: caseInfo.information,
      status: "hospitalised",
    });
    freeUpAmbulance();
    // have to free up ambulance, state - free, case "" , if waiting > 0 assign first waiting
  }

  async function freeUpAmbulance() {
    const ambulanceRef = collection(db, `/Hospitals/${hospital}/Ambulances`);
    const q = query(ambulanceRef, where("case", "==", caseInfo.nhs));
    const querySnapshot = await getDocs(q);
    const firstFree = querySnapshot.docs[0].id;
    const ambulanceToFree = doc(
      db,
      `/Hospitals/${hospital}/Ambulances`,
      firstFree
    );
    await updateDoc(ambulanceToFree, {
      free: true,
      case: " ",
    });
    //setcaseInfo(patientInit);
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          hospitalise();
          setCaseInfo(patientInit);
          alert("Patient Hospitalised");
          //window.location.reload();
        }}
      >
        Hospitalise
      </Button>
    </div>
  );
}
