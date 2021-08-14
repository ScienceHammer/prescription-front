import {
  Avatar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.primary.main,
    backgroundColor: "white",
  },
}));

function DoctorHeaderMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="DoctorHeaderMenu">
      <div className={classes.root}>
        <Typography>
          Hello Dr. {store.getState().authState.user?.lastName}
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar
            className={classes.avatar}
            // src={globals.urls.getImage + props.clientInfo.image}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id="menu"
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <NavLink to="">
            <MenuItem>My Info</MenuItem>
          </NavLink>
          <NavLink to="/logout">
            <MenuItem>Logout </MenuItem>
          </NavLink>
        </Menu>
      </div>
    </div>
  );
}

export default DoctorHeaderMenu;
