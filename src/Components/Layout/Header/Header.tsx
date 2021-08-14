import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
  IconButton,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect, useState } from "react";
import GuestHeaderMenu from "./GuestHeaderMenu/GuestHeaderMenu";
import store from "../../../Redux/Store";
import { Role } from "../../../Models/RoleEnum";
import UserHeaderMenu from "./UserHeaderMenu/UserHeaderMenu";
import DoctorHeaderMenu from "./DoctorHeaderMenu/DoctorHeaderMenu";
import DrawerList from "../DrawerList/DrawerList";

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  typo: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

function Header(): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });
  const [role, setRole] = useState<Role>(store.getState().authState.user?.role);

  useEffect(() => {
    const unsubscribeMe = store.subscribe(() => {
      setRole(store.getState().authState.user?.role);
    });
    return () => {
      unsubscribeMe();
    };
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, left: open });
    };

  return (
    <div className="Header">
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.typo} variant="h6" component="div">
              Prescription
            </Typography>
            {role == null && <GuestHeaderMenu />}
            {role === Role.User && <UserHeaderMenu />}
            {role === Role.Doctor && <DoctorHeaderMenu />}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <DrawerList />
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
