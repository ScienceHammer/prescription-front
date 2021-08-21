import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Select,
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
import React, { ChangeEvent, useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { DoseFrequencyEnum } from "../../../Models/DoseFrequencyEnum";
import { DoseTypeEnum } from "../../../Models/DoseTypeEnum";
import PrescripedMed from "../../../Models/PrescripedMed";
import { UnitsEnum } from "../../../Models/UnitsEnum";
import Autocomplete from "@material-ui/lab/Autocomplete";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import JwtAxios from "../../../Services/JwtAxios";
import Prescription from "../../../Models/Prescription";

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
  const { setValue, handleSubmit, register } = useForm<Prescription>();
  const [prescripedMed, setPrescripedMed] = useState<PrescripedMed>(
    new PrescripedMed()
  );
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<UserModel[]>([]);
  const [optionSelected, setOptionSelected] = useState({
    userIdNumber: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await JwtAxios.get(
        "http://localhost:8080/api/doctor/findUserByUserIdNumber"
      );
      const users = response.data;
      console.log(users);

      if (active) {
        setOptions([...users]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  async function send(prescription: Prescription) {
    prescription.prescribedMeds = [...prescripedMeds];
    const response = await JwtAxios.post<Prescription>(
      "http://localhost:8080/api/doctor/addPrescription",
      prescription
    );
    console.log(response.data);
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
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: "200px", marginLeft: "15px" }}
          freeSolo
          disableClearable
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          getOptionSelected={(option, value) =>
            option.userIdNumber === value.userIdNumber
          }
          getOptionLabel={(option) => option.userIdNumber}
          options={options}
          loading={loading}
          autoHighlight
          renderInput={(params) => (
            <TextField
              {...params}
              label="Id Number"
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              onChange={(event) => {
                optionSelected.userIdNumber = event.target.value as string;
                setOptionSelected({ ...optionSelected });
                setValue("patient.userIdNumber", optionSelected.userIdNumber);
              }}
            />
          )}
          renderOption={(option) => {
            return (
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography
                    variant="body1"
                    color="primary"
                    onClick={() => {
                      setOptionSelected({ ...option });
                      setValue("patient", option);
                    }}
                  >
                    {option.userIdNumber}
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        />

        <Box className={classes.box}>
          <TextField
            id="firstName"
            label="First Name"
            name="firstName"
            size="small"
            value={optionSelected.firstName}
            onChange={(event: React.ChangeEvent<{ value: any }>) => {
              optionSelected.firstName = event.target.value as string;
              setOptionSelected({ ...optionSelected });
              setValue("patient.firstName", optionSelected.firstName);
            }}
            style={{ width: "20%" }}
            autoFocus
          />
          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            size="small"
            value={optionSelected.lastName}
            onChange={(event: React.ChangeEvent<{ value: any }>) => {
              optionSelected.lastName = event.target.value as string;
              setOptionSelected({ ...optionSelected });
              setValue("patient.lastName", optionSelected.lastName);
            }}
            style={{ width: "30%" }}
            autoFocus
          />
          <TextField
            id="email"
            label="Email Adress"
            name="email"
            size="small"
            style={{ width: "20%" }}
            value={optionSelected.email}
            onChange={(event: React.ChangeEvent<{ value: any }>) => {
              optionSelected.email = event.target.value as string;
              setOptionSelected({ ...optionSelected });
              setValue("patient.email", optionSelected.email);
            }}
            autoFocus
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            size="small"
            style={{ width: "20%" }}
            value={optionSelected.phoneNumber}
            onChange={(event: React.ChangeEvent<{ value: any }>) => {
              optionSelected.phoneNumber = event.target.value as string;
              setOptionSelected({ ...optionSelected });
              setValue("patient.phoneNumber", optionSelected.phoneNumber);
            }}
            autoFocus
          />
        </Box>
        <TextField
          id="reason"
          label="Reason"
          name="reason"
          size="small"
          style={{ width: "40%", marginLeft: "15px" }}
          autoFocus
          inputProps={{ ...register("reason") }}
          // InputProps={{ ...register("reason") }}
        />
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Active Sub</TableCell>
                <TableCell align="center">Dose Type</TableCell>
                <TableCell align="center">Dose Amount</TableCell>
                <TableCell align="center">Unit</TableCell>
                <TableCell align="center">Number Of Dosages</TableCell>
                <TableCell align="center">Frequency</TableCell>
                <TableCell align="center">Number Of Days</TableCell>
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
                  <FormControl>
                    <Select
                      native
                      value={
                        prescripedMed.doseType === null
                          ? ""
                          : prescripedMed.doseType
                      }
                      onChange={(event: React.ChangeEvent<{ value: any }>) => {
                        prescripedMed.doseType = event.target
                          .value as DoseTypeEnum;
                        setPrescripedMed({ ...prescripedMed });
                      }}
                    >
                      <option aria-label="None" value="" />
                      {Object.entries(DoseTypeEnum).map((obj) => (
                        <option key={obj[0]} value={obj[1]}>
                          {obj[0]}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
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
                  <FormControl>
                    <Select
                      native
                      value={
                        prescripedMed.dosageUnit === null
                          ? ""
                          : prescripedMed.dosageUnit
                      }
                      onChange={(event: React.ChangeEvent<{ value: any }>) => {
                        prescripedMed.dosageUnit = event.target
                          .value as UnitsEnum;
                        setPrescripedMed({ ...prescripedMed });
                      }}
                    >
                      <option aria-label="None" value="" />
                      {Object.entries(UnitsEnum).map((obj) => (
                        <option key={obj[0]} value={obj[1]}>
                          {obj[0]}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
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
                  <FormControl>
                    <Select
                      native
                      value={
                        prescripedMed.doseFrequency === null
                          ? ""
                          : prescripedMed.doseFrequency
                      }
                      onChange={(event: React.ChangeEvent<{ value: any }>) => {
                        prescripedMed.doseFrequency = event.target
                          .value as DoseFrequencyEnum;
                        setPrescripedMed({ ...prescripedMed });
                      }}
                    >
                      <option aria-label="None" value="" />
                      {Object.entries(DoseFrequencyEnum).map((obj) => (
                        <option key={obj[0]} value={obj[1]}>
                          {obj[0]}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
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
                  <TableCell align="right">{row.doseType}</TableCell>
                  <TableCell align="right">{row.doseAmount}</TableCell>
                  <TableCell align="right">{row.dosageUnit}</TableCell>
                  <TableCell align="right">{row.dosage}</TableCell>
                  <TableCell align="right">{row.doseFrequency}</TableCell>
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
