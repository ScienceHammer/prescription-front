import {
  Box,
  Button,
  Dialog,
  makeStyles,
  Modal,
  Theme,
} from "@material-ui/core";
import { useState } from "react";
import Login from "../../../Auth/Login/Login";
import SignUp from "../../../Auth/Signup/SignUp";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    boxSizing: "border-box",
    position: "absolute",
    width: 300,
    height: 450,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "2px",
    boxShadow: theme.shadows[10],
    padding: theme.spacing(1, 0, 1),
  },
  signUp: {
    boxSizing: "border-box",
    position: "absolute",
    width: 600,
    //  height: 450,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "2px",
    boxShadow: theme.shadows[10],
    //   padding: theme.spacing(1, 0, 1),
  },
}));

function GuestHeaderMenu(): JSX.Element {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  return (
    <div className="GuestHeaderMenu">
      <Box className={classes.root}>
        <Button color="inherit" onClick={handleSignUpOpen}>
          SignUp
        </Button>
        <Button color="inherit" onClick={handleLoginOpen}>
          Login
        </Button>
        <Modal
          open={loginOpen}
          onClose={handleLoginClose}
          aria-labelledby="modal-login"
        >
          <div id="modal-login" className={classes.login} style={modalStyle}>
            <Login onClose={handleLoginClose} />
          </div>
        </Modal>
        <Dialog
          open={signUpOpen}
          onClose={handleSignUpClose}
          aria-labelledby="modal-SignUp"
        >
          <SignUp onClose={handleSignUpClose} />
        </Dialog>
      </Box>
    </div>
  );
}

export default GuestHeaderMenu;
