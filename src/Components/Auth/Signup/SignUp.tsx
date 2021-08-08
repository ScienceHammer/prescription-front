import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { Role } from "../../../Models/RoleEnum";
import { signUpAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    "& > *": {
      width: "100%",
      marginTop: theme.spacing(2),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  raw: {
    width: "100%",
    display: "flex",
    "& > *": {
      width: "100%",
      marginRight: theme.spacing(2),
    },
  },
}));

function SignUp(): JSX.Element {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<UserModel>();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  async function send(user: UserModel) {
    try {
      if (checked) {
        user.role = Role.Doctor;
      } else {
        user.role = Role.User;
        user.doctor = null;
      }
      console.log(user);
      const signUp = await axios.post<string>(
        "http://localhost:8080/api/auth/register",
        user
      );
      store.dispatch(signUpAction(signUp.data));
      console.log(signUp.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="SignUp">
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(send)}>
            <Box className={classes.raw}>
              <TextField
                variant="outlined"
                id="username"
                label="Username"
                name="username"
                autoFocus
                {...register("username")}
              />
              <TextField
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoFocus
                {...register("password")}
              />
            </Box>
            <Box className={classes.raw}>
              <TextField
                variant="outlined"
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                {...register("firstName")}
              />
              <TextField
                variant="outlined"
                name="lastName"
                label="Last Name"
                id="lastName"
                autoFocus
                {...register("lastName")}
              />
            </Box>
            <Box className={classes.raw}>
              <TextField
                variant="outlined"
                name="userIdNumber"
                label="Id Number"
                id="userIdNumber"
                autoFocus
                {...register("userIdNumber")}
              />
            </Box>
            <Box className={classes.raw}>
              <TextField
                variant="outlined"
                id="email"
                label="Email"
                name="email"
                autoFocus
                {...register("email")}
              />
              <TextField
                variant="outlined"
                name="phoneNumber"
                label="Phone Number"
                id="phoneNumber"
                autoFocus
                {...register("phoneNumber")}
              />
            </Box>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Doctor"
            />
            <Collapse in={checked}>
              <Box className={classes.raw}>
                <TextField
                  variant="outlined"
                  id="liscenceNumber"
                  label="Liscence Number"
                  name="liscenceNumber"
                  autoFocus
                  {...register("doctor.liscenceNumber")}
                />
                <TextField
                  variant="outlined"
                  name="medicAddress"
                  label="Medic Address"
                  id="medicAddress"
                  autoFocus
                  {...register("doctor.medicAddress")}
                />
              </Box>
            </Collapse>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
