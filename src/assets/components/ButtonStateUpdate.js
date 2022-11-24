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

export default function ButtonStateUpdate({
  caseInfo,
  hospital,
  setCaseInfo,
  patientInit,
  discharge,
}) {
  const [freeAmbulances, setFreeAmbulances] = React.useState("");

  const [waiting, setWaiting] = React.useState("");

  //   const [names, setNames] = useState(["John Doe"]);

  //   const hospitals = [
  //     "Hospital Final Destination",
  //     "Hospital In Stitches",
  //     "Hospital The All Nighters",
  //   ];

  async function disCharge() {
    //todo: update waiting state properly
    const docRef2 = doc(db, "Patients", caseInfo.nhs);
    await updateDoc(docRef2, {
      name: caseInfo.name,
      condition: caseInfo.condition,
      gender: caseInfo.gender,
      //information: caseInfo.information,
      status: "discharged",
      hisotry: "Discharged from: " + hospital + " at: " + Date(),
    });
    await deleteDoc(doc(db, `/Hospitals/${hospital}/Cases`, caseInfo.nhs));
    freeUpAmbulance();
    //setPatientLoad(patientInit);
    // have to free up ambulance, state - free, case "" , if waiting > 0 assign first waiting
  }

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

  async function updateFreeState() {
    //need to do the queries after
    const path = `/Hospitals/${hospital}/Ambulances`;
    const ambulanceRef = collection(db, path);

    const qtrue = query(ambulanceRef, where("free", "==", true));
    const qfalse = query(ambulanceRef, where("free", "==", false));

    const querySnapshotTrue = await getDocs(qtrue);
    const querySnapshotFalse = await getDocs(qfalse);

    const path2 = `/Hospitals/${hospital}/Cases`;
    const messageRef1 = collection(db, path2);

    const qWaitingCases = query(messageRef1, where("status", "==", "waiting"));
    const querySnapshotWaitingCases = await getDocs(qWaitingCases);

    if (querySnapshotWaitingCases.size > 0 && querySnapshotTrue.size > 0) {
      const firstFree = querySnapshotTrue.docs[0].id;

      const ambulanceToAssign = doc(db, path, firstFree);
      const patientToAssing = doc(
        db,
        `/Hospitals/${hospital}/Cases`,
        querySnapshotWaitingCases.docs[0].id
      );

      await updateDoc(ambulanceToAssign, {
        free: false,
        case: querySnapshotWaitingCases.docs[0].id,
      });

      await updateDoc(patientToAssing, {
        status: "assigned",
      });
      setWaiting(querySnapshotWaitingCases.size);
    }

    if (querySnapshotTrue.size === 0 && querySnapshotFalse.size === 0) {
      console.log("empty");
      setFreeAmbulances("empty");
    } else {
      setFreeAmbulances(querySnapshotTrue.size);
    }
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
    //setPatientLoad(patientInit);
    await updateFreeState();
  }

  async function updateFreeState() {
    //need to do the queries after
    const path = `/Hospitals/${hospital}/Ambulances`;
    const ambulanceRef = collection(db, path);

    const qtrue = query(ambulanceRef, where("free", "==", true));
    const qfalse = query(ambulanceRef, where("free", "==", false));

    const querySnapshotTrue = await getDocs(qtrue);
    const querySnapshotFalse = await getDocs(qfalse);

    const path2 = `/Hospitals/${hospital}/Cases`;
    const messageRef1 = collection(db, path2);

    const qWaitingCases = query(messageRef1, where("status", "==", "waiting"));
    const querySnapshotWaitingCases = await getDocs(qWaitingCases);

    if (querySnapshotWaitingCases.size > 0 && querySnapshotTrue.size > 0) {
      const firstFree = querySnapshotTrue.docs[0].id;

      const ambulanceToAssign = doc(db, path, firstFree);
      const patientToAssing = doc(
        db,
        `/Hospitals/${hospital}/Cases`,
        querySnapshotWaitingCases.docs[0].id
      );

      await updateDoc(ambulanceToAssign, {
        free: false,
        case: querySnapshotWaitingCases.docs[0].id,
      });

      await updateDoc(patientToAssing, {
        status: "assigned",
      });
      setWaiting(querySnapshotWaitingCases.size);
    }

    if (querySnapshotTrue.size === 0 && querySnapshotFalse.size === 0) {
      console.log("empty");
      setFreeAmbulances("empty");
    } else {
      setFreeAmbulances(querySnapshotTrue.size);
    }
    console.log(
      "Free ambulances: " +
        querySnapshotTrue.size +
        "; Busy ambulances: " +
        querySnapshotFalse.size +
        "; Waiting Patients: " +
        querySnapshotWaitingCases.size
    );
  }

  return (
    <div>
      {discharge ? (
        <Button
          variant="contained"
          onClick={() => {
            disCharge();
            setCaseInfo(patientInit);
          }}
        >
          Discharge
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            hospitalise();
            setCaseInfo(patientInit);
          }}
        >
          Hospitalise
        </Button>
      )}
    </div>
  );
}
