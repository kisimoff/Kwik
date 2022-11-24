import { React, useState } from "react";
import "./App.css";
import ambulanceRotate from "./assets/media/ambulanceRotate.svg";
import kwickmedical from "./assets/media/kwickmedical.png";
import ambulance from "./assets/media/ambulance.svg";
import hospital from "./assets/media/hospital.svg";
import operator from "./assets/media/operator.svg";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import OperatorDialog from "./assets/dialogs/Operator.js";
import HospitalDialog from "./assets/dialogs/Hospital.js";
import AmblanceDialog from "./assets/dialogs/Ambulance.js";
import babi from "./assets/media/babi.jpg";

function App() {
  const [isOperator, setIsOperator] = useState(false);
  const [isHospital, setIsHospital] = useState(false);
  const [isAmbulance, setIsAmbulance] = useState(false);

  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <header className="App-header">
        <img src={ambulanceRotate} className="App-logo" alt="Ambulance" />
        <img src={kwickmedical} className="App-logop2" alt="kwickmedical" />
        <img src={ambulanceRotate} className="App-logo3" alt="Ambulance" />
      </header>

      <div>
        <p className="roleText">Choose yer role below:</p>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => {
              setIsOperator(true);
            }}
          >
            <img src={operator} className="role" alt="operator" />
          </Button>
          <Button
            onClick={() => {
              setIsHospital(true);
            }}
          >
            <img src={hospital} className="role" alt="hospital" />
          </Button>
          <Button
            onClick={() => {
              setIsAmbulance(true);
            }}
          >
            <img src={ambulance} className="role" alt="ambulance" />
          </Button>
        </ButtonGroup>
      </div>
      <img src={babi} className="babi" alt="Ambulance" />

      <OperatorDialog
        open={isOperator}
        onClose={() => setIsOperator(false)}
      ></OperatorDialog>
      <AmblanceDialog
        open={isAmbulance}
        onClose={() => setIsAmbulance(false)}
      ></AmblanceDialog>
      <HospitalDialog
        open={isHospital}
        onClose={() => setIsHospital(false)}
      ></HospitalDialog>

      {/* <div className="App-notes">
        <p>
          KwikMedical is a <b>DISTRIBUTED</b> system
        </p>
        <p>
          This is a <b>PROTOTYPE</b> to pitch and win the <b>CONTRACT</b>.
        </p>
      </div> */}
    </div>
  );
}

export default App;
