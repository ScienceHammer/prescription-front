import {
   Box,
   Collapse,
   Divider,
   FormControlLabel,
   IconButton,
   makeStyles,
   Paper,
   Radio,
   RadioGroup,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Theme,
   Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Prescription from "../../../Models/Prescription";
import JwtAxios from "../../../Services/JwtAxios";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { rawListeners } from "process";
import { Label } from "@material-ui/icons";
import store from "../../../Redux/Store";
import { Role } from "../../../Models/RoleEnum";

const useRowStyles = makeStyles((theme: Theme) => ({
   root: {
      "& > *": {
         borderBottom: "unset",
      },
   },
   doc: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      marginTop: theme.spacing(1),
   },
   table: {
      minWidth: 650,
      width: "90%",
      margin: "auto",
   },
   h1: {
      margin: theme.spacing(1, 0),
   },
   divider: {
      color: theme.palette.primary.main,
      height: "1px",
   },
   box: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "15px",
      textAlign: "left",
   },
   medic: {
      margin: theme.spacing(2),
   },
}));

function Row(props: { row: Prescription }) {
   const { row } = props;
   const [open, setOpen] = useState<boolean>(false);
   const classes = useRowStyles();
   return (
      <>
         <TableRow className={classes.root}>
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
               {store.getState().authState.user.role === Role.Doctor
                  ? row.patient.firstName + " " + row.patient.lastName
                  : row.doctor.firstName + " " + row.doctor.lastName}
            </TableCell>
            <TableCell align="right">{row.reason}</TableCell>
            <TableCell align="right">""</TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                     <Box className={classes.doc}>
                        <Typography variant="h5" gutterBottom component="div">
                           {"Dr." +
                              row.doctor.firstName +
                              " " +
                              row.doctor.lastName}
                        </Typography>
                        <Typography
                           variant="body2"
                           gutterBottom
                           component="div">
                           {row.doctor.email}
                           <br />
                           {row.doctor.phoneNumber}
                           <br />
                           {row.doctor.doctor?.liscenceNumber}
                        </Typography>
                     </Box>
                     <Divider variant="middle" className={classes.divider} />
                     <br />
                     <Box width="200px" marginLeft="15px" borderBottom={1}>
                        <Typography
                           variant="caption"
                           color="primary"
                           gutterBottom
                           component="div">
                           {"Id Number"}
                        </Typography>
                        <Typography
                           variant="body1"
                           gutterBottom
                           component="div">
                           {row.patient.userIdNumber}
                        </Typography>
                     </Box>

                     <Box className={classes.box}>
                        <Box width="20%" borderBottom={1}>
                           <Typography
                              variant="caption"
                              color="primary"
                              gutterBottom
                              component="div">
                              {"First Name"}
                           </Typography>
                           <Typography
                              variant="body1"
                              gutterBottom
                              component="div">
                              {row.patient.firstName}
                           </Typography>
                        </Box>
                        <Box width="30%" borderBottom={1}>
                           <Typography
                              variant="caption"
                              color="primary"
                              gutterBottom
                              component="div">
                              {"Last Name"}
                           </Typography>
                           <Typography
                              variant="body1"
                              gutterBottom
                              component="div">
                              {row.patient.lastName}
                           </Typography>
                        </Box>
                        <Box width="20%" borderBottom={1}>
                           <Typography
                              variant="caption"
                              color="primary"
                              gutterBottom
                              component="div">
                              {"Email Address"}
                           </Typography>
                           <Typography
                              variant="body1"
                              gutterBottom
                              component="div">
                              {row.patient.email}
                           </Typography>
                        </Box>
                        <Box width="20%" borderBottom={1}>
                           <Typography
                              variant="caption"
                              color="primary"
                              gutterBottom
                              component="div">
                              {"Phone Number"}
                           </Typography>
                           <Typography
                              variant="body1"
                              gutterBottom
                              component="div">
                              {row.patient.phoneNumber}
                           </Typography>
                        </Box>
                     </Box>
                     <Box width="20%" marginLeft="15px" borderBottom={1}>
                        <Typography
                           variant="caption"
                           color="primary"
                           gutterBottom
                           component="div">
                           {"Reason"}
                        </Typography>
                        <Typography
                           variant="body1"
                           gutterBottom
                           component="div">
                           {row.reason}
                        </Typography>
                     </Box>
                     <br />
                     <Table size="small" aria-label="purchases">
                        <TableHead>
                           <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="center">Active Sub</TableCell>
                              <TableCell align="center">Dose Type</TableCell>
                              <TableCell align="center">Dose Amount</TableCell>
                              <TableCell align="center">Unit</TableCell>
                              <TableCell align="center">
                                 Number Of Dosages
                              </TableCell>
                              <TableCell align="center">Frequency</TableCell>
                              <TableCell align="center">
                                 Number Of Days
                              </TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {row.prescribedMeds.map((medRow) => (
                              <TableRow key={medRow.id}>
                                 <TableCell component="th" scope="row">
                                    {medRow.name}
                                 </TableCell>
                                 <TableCell>{medRow.activeSubstance}</TableCell>
                                 <TableCell align="right">
                                    {medRow.doseType}
                                 </TableCell>
                                 <TableCell align="right">
                                    {medRow.doseAmount}
                                 </TableCell>
                                 <TableCell align="right">
                                    {medRow.dosageUnit}
                                 </TableCell>
                                 <TableCell align="right">
                                    {medRow.dosage}
                                 </TableCell>
                                 <TableCell align="right">
                                    {medRow.doseFrequency}
                                 </TableCell>
                                 <TableCell align="right">
                                    {medRow.numberOfTakingDays}
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </>
   );
}

function ShowPrescriptions(): JSX.Element {
   const [prescriptions, setPrescriptions] = useState<Prescription[]>(null);
   const [value, setValue] = useState("patient");

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
   };

   useEffect(() => {
      (async () => {
         let response;
         if (value === "doctor") {
            response = await JwtAxios.get(
               "http://localhost:8080/api/doctor/getAllDoctorPrescriptions"
            );
         } else {
            response = await JwtAxios.get(
               "http://localhost:8080/api/patient/getAllPatientPrescriptions"
            );
         }
         console.log(response.data);
         setPrescriptions([...response.data]);
      })();
   }, [value]);

   return (
      <div>
         {store.getState().authState.user.role === Role.Doctor && (
            <RadioGroup
               aria-label="prescription-user"
               name="prescription-user"
               row
               value={value}
               onChange={handleChange}>
               <FormControlLabel
                  value="patient"
                  control={<Radio />}
                  label="Patients Prescriptions"
               />
               <FormControlLabel
                  value="doctor"
                  control={<Radio />}
                  label="Doctor Prescriptions"
               />
            </RadioGroup>
         )}
         <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
               <TableHead>
                  <TableRow>
                     <TableCell />
                     <TableCell>
                        {store.getState().authState.user.role === Role.Doctor
                           ? "Patient"
                           : "Doctor"}
                     </TableCell>
                     <TableCell align="right">Reason</TableCell>
                     <TableCell align="right">Date</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {prescriptions?.map((row) => (
                     <Row key={row.id} row={row} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
}

export default ShowPrescriptions;
