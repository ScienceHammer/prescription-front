import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { Role } from "../../../Models/RoleEnum";
import { signUpAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    // width: "100%",
    // display: "flex",
    // flexDirection: "column",
    // marginTop: theme.spacing(4),
    // "& > *": {
    //   width: "100%",
    //   marginTop: theme.spacing(2),
    // },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  raw: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp(props: { onClose: any }): JSX.Element {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<UserModel>();
  const [checked, setChecked] = useState(false);
  const history = useHistory();

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
      props.onClose();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="SignUp">
      <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>♂{" "}
      <form className={classes.form} onSubmit={handleSubmit(send)}>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Box>
            <TextField
              id="username"
              label="Username"
              name="username"
              autoFocus
              {...register("username")}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              id="password"
              autoFocus
              {...register("password")}
            />
          </Box>
          <Box>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              {...register("firstName")}
            />
            <TextField
              name="lastName"
              label="Last Name"
              id="lastName"
              autoFocus
              {...register("lastName")}
            />
          </Box>
          <Box>
            <TextField
              name="userIdNumber"
              label="Id Number"
              id="userIdNumber"
              autoFocus
              {...register("userIdNumber")}
            />
          </Box>
          <Box>
            <TextField
              id="email"
              label="Email"
              name="email"
              autoFocus
              {...register("email")}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              id="phoneNumber"
              autoFocus
              {...register("phoneNumber")}
            />
          </Box>
          <Box className={classes.raw}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label="Doctor"
            />
            <Collapse in={checked}>
              <TextField
                id="liscenceNumber"
                label="Liscence Number"
                name="liscenceNumber"
                autoFocus
                {...register("doctor.liscenceNumber")}
              />
              <TextField
                name="medicAddress"
                label="Medic Address"
                id="medicAddress"
                autoFocus
                {...register("doctor.medicAddress")}
              />
            </Collapse>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default SignUp;
