import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(7),
    "& > *": {
      width: "100%",
      margin: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(): JSX.Element {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<CredentialsModel>();

  async function send(credentials: CredentialsModel) {
    try {
      const loginResp = await axios.post<string>(
        "http://localhost:8080/api/auth/login?" +
          "password=" +
          credentials.password +
          "&username=" +
          credentials.username
      );
      store.dispatch(loginAction(loginResp.data));
      console.log(loginResp.data);
      notify.success("You are successfully logged in");
    } catch (err) {
      notify.error("Wrong email or password");
    }
  }

  return (
    <div className="Login">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(send)}>
            <TextField
              variant="outlined"
              required
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              {...register("username")}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoFocus
              {...register("password")}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
