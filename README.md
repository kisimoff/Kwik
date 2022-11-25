# What is this?
This is a prototype of a medical system which has three main parts:

##Operator 
Receives a call from a potential patient and inputs the data into the system. On submission, the system tryies to find a free ambulance based on the patient postcode. Current supported postcodes are simply 1, 2, 3. There are 3 hospitals with 3 ambulances each. If there is no ambulances avaliable for the specified postcode, the patient is assigned a "waiting" state, which would update as soon there is a free ambulance. The patient's information is passed to the Hospital and Ambulance.   Each request is called a “Case” in the described system.

##Hospital
The hospital would receive a Case from the operator. The hospital would have all the information of the patient, which can be updated by the hospital or the ambulance. The hospital can change the state of the patient from "Assigned" and "Waiting" to "Discharged".

##Ambulance
An ambulance would receive a case, depending on its availability and would be able to read and update the case’s information. The ambulance can change the state of the patient to “hospitalised”, which means that the patient is "delivered" at the hospital In the system developed there are 3 ambulances per hospital, but can be easily adjusted from the “numberOfAmbulances” variable in the source-code. 

# How to run it?
Simply visit https://vtwenty3.github.io/Kwik/ to see it live and have a go. To modify the source code folow these steps:
1.	Download and extract the master branch from the repo. 
2.	Install NPM package manager
3.	Open a terminal window (works perfectly with VS Code terminal)
4.	Navigate to the repo directory
5.	Run “npm install react”
6.	Run “npm start”
The system would be now running.



# Software Architecture
###Client-server distributed single page application system designed using the Model View Controller Pattern and Component Based Architecture

The system developed is designed with the following technologies and tools – React.Js and Firebase Firestore and it is hosted on GitHub Pages.

###Client Server Distributed System
Client-server systems, the most traditional and simple type of dis-tributed system, involve a multitude of networked computers that interact with a central server for data storage, processing or another common goal.

###Single-Page Application (SPA)
A single-page application is a web application which updates the page ui and data with new data from a web server, which is the con-trast of the default method of loading a completely new page. Ex-amples of SPA are Gmail, Airbnb, Netflix and much more. SPA is es-sential to building a fluid, interactive scalable experience. SPA's ma-jor disadvantage is when trying SEO. 

###The Model View Controller Pattern (MVC)
Divides an interactive system into 3 components model – core data and domain logic (data model) views - display information to a user. Each multiple users requires one view. (user interface) controllers - handle user input, one per view. (control logic)
The view component in the system is the JSX React components. This indludes, buttons, input fields, alerts, dialogs, icons, back-ground colours and etc. The actual UI elements of the system.
The controller components is the business logic defined in the Ja-vaScript functions and methods. The controller responds and han-dles to processes and events generated by the user. Clicks, hovers on the Operator icon, or “Submit” button. It invokes queries and changes in the model component which in the system developed is NoSql Cloud Database – “Firestore” by Firebase developed by Google. 


##	Components and Connectors in the software architecture.
###Components:
Definition: “components are known as programs and sub-programs or functions or procedures. The components can be packaged as a black box. Each component must be called to be executed. It will do its predefined processing then return to the place in the program it was called from. A component should not have a state i.e. information it retains from one call to the next. A component may share data, for example, a pointer to a linked list or file may be passed to the compo-nent”

A few components in the system developed:
“hospitalize” function - share data, returns a reference to a docu-ment which includes the patient case in the specified hospital.
“update” function - returns a reference to the paper which includes the selected patient case
“updateState” function - returns a reference to the document which state has to be modified

###Connectors:
Definition: “The connectors which tie the system together are the message based communications passing data between the compo-nents. A connector is a procedure call to a named procedure. It may pass in input parameters and pass out return or output parameters. The connectors are the events and the subsequent procedure calls. The implementation of these systems varies enormously. Events may be software interrupts or inter-process communication messages.”
A few connectors in the system developed:
All the onClick events of the buttons:
ButtonHospitalCase.js
ButtonStateUpdate.js
ButtonUpdateCase.js
Hover events on Ambulance svg in the header
Selection from a dropdown menu (hospital or case)
The data input from a “Load “ button click
The data passing from a “Assign” button click


