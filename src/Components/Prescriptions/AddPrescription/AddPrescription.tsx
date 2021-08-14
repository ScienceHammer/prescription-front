import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
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
import { useState } from "react";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import PrescripedMed from "../../../Models/PrescripedMed";
import { UnitsEnum } from "../../../Models/UnitsEnum";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginTop: theme.spacing(1),
    // alignContent: "center",
    // justifyContent: "center",
    // border: "1px solid",
    // borderColor: theme.palette.primary.main,
    background: theme.palette.background.paper,
    height: "100vh",
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
    marginLeft: "15px",
    textAlign: "left",
  },
  medic: {
    margin: theme.spacing(2),
  },
}));

function AddPrescription() {
  const classes = useStyles();
  const [prescripedMeds, setPrescripedMeds] = useState<PrescripedMed[]>([]);
  const { register, handleSubmit } = useForm();
  const [prescripedMed, setPrescripedMed] = useState<PrescripedMed>(
    new PrescripedMed()
  );

  const addPrescripedMed = () => {
    console.log(prescripedMed);
  };

  async function send(prescription: any) {
    console.log(prescription);
  }

  return (
    <div className="AddPrescription">
      <form onSubmit={handleSubmit(send)} className={classes.form}>
        <h1 className={classes.h1}>
          {"Dr." +
            store.getState().authState.user.firstName +
            " " +
            store.getState().authState.user.lastName}
        </h1>
        <h5>
          {store.getState().authState.user.email}
          <br />
          {store.getState().authState.user.phoneNumber}
          <br />
          {store.getState().authState.user.doctor?.liscenceNumber}
        </h5>
        <Divider variant="middle" className={classes.divider} />
        <br />
        <TextField
          id="idNumber"
          label="Id Number"
          name="idNumber"
          size="small"
          style={{ width: "200px", marginLeft: "15px" }}
          autoFocus
        />
        <Box className={classes.box}>
          <TextField
            id="patientName"
            label="Patient Name"
            name="patientName"
            size="small"
            style={{ width: "50%" }}
            {...register("patientName")}
            autoFocus
          />
          <TextField
            id="gender"
            label="Gender"
            name="gender"
            size="small"
            style={{ width: "15%" }}
            {...register("gender")}
            autoFocus
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            size="small"
            style={{ width: "20%" }}
            {...register("phoneNumber")}
            autoFocus
          />
        </Box>

        <Box className={classes.medic}>
          {/* <TextField
              id="doseType"
              variant="outlined"
              label="Dose Type"
              name="doseType"
              size="small"
              value={prescripedMed.doseType}
              onChange={(event: SyntheticEvent) => {
                prescripedMed.doseType = (event.target as HTMLInputElement).value;
              }}
              autoFocus
            /> */}

          {/* <TextField
              id="dosageUnit"
              variant="outlined"
              label="Dosage Unit"
              name="dosageUnit"
              size="small"
              value={prescripedMed.dosageUnit}
              onChange={(event: SyntheticEvent) => {
                prescripedMed.dosageUnit = (
                  event.target as HTMLInputElement
                ).value;
              }}
              autoFocus
            /> */}
          {/* <TextField
              id="doseFrequency"
              variant="outlined"
              label="Dose Frequency"
              name="doseFrequency"
              size="small"
              autoFocus
            /> */}
        </Box>

        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Active Sub</TableCell>
                <TableCell align="right">Dose Amount</TableCell>
                <TableCell align="right">Dosages</TableCell>
                <TableCell align="right">Number Of Taking Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <TextField
                    id="name"
                    name="name"
                    size="small"
                    value={prescripedMed.name}
                    onChange={(event: SyntheticEvent) => {
                      prescripedMed.name = (
                        event.target as HTMLInputElement
                      ).value;
                      setPrescripedMed({ ...prescripedMed });
                    }}
                    autoFocus
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="activeSubstance"
                    name="activeSubstance"
                    size="small"
                    value={prescripedMed.activeSubstance}
                    onChange={(event: SyntheticEvent) => {
                      prescripedMed.activeSubstance = (
                        event.target as HTMLInputElement
                      ).value;
                      setPrescripedMed({ ...prescripedMed });
                    }}
                    autoFocus
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="doseAmount"
                    name="doseAmount"
                    size="small"
                    value={prescripedMed.doseAmount}
                    onChange={(event: SyntheticEvent) => {
                      prescripedMed.doseAmount = Number(
                        (event.target as HTMLInputElement).value
                      );
                      setPrescripedMed({ ...prescripedMed });
                    }}
                    autoFocus
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="dosage"
                    name="dosage"
                    size="small"
                    value={prescripedMed.dosage}
                    onChange={(event: SyntheticEvent) => {
                      prescripedMed.dosage = Number(
                        (event.target as HTMLInputElement).value
                      );
                      setPrescripedMed({ ...prescripedMed });
                    }}
                    autoFocus
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="numberOfTakingDays"
                    name="numberOfTakingDays"
                    size="small"
                    value={prescripedMed.numberOfTakingDays}
                    onChange={(event: SyntheticEvent) => {
                      prescripedMed.numberOfTakingDays = Number(
                        (event.target as HTMLInputElement).value
                      );
                      setPrescripedMed({ ...prescripedMed });
                    }}
                    autoFocus
                  />
                </TableCell>
                <TableCell
                  onClick={() => {
                    prescripedMeds.push({ ...prescripedMed });
                    setPrescripedMeds([...prescripedMeds]);
                    setPrescripedMed(new PrescripedMed());
                  }}
                >
                  <Button variant="contained" color="primary">
                    Add
                  </Button>
                </TableCell>
              </TableRow>
              {prescripedMeds.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.activeSubstance}</TableCell>
                  <TableCell align="right">{row.doseAmount}</TableCell>
                  <TableCell align="right">{row.dosage}</TableCell>
                  <TableCell align="right">{row.numberOfTakingDays}</TableCell>
                  <TableCell
                    onClick={() => {
                      prescripedMeds.splice(index, 1);
                      setPrescripedMeds([...prescripedMeds]);
                    }}
                  >
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box marginTop="5px">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            // onClick={() => {
            //   prescripedMeds.push(prescripedMed);
            //   console.log(prescripedMed);
            // }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default AddPrescription;
