import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";
import GuestHeaderMenu from "./GuestHeaderMenu/GuestHeaderMenu";

const useStyles = makeStyles((theme: Theme) => ({
  typo: {
    flexGrow: 1,
  },
}));

function Header(): JSX.Element {
  const classes = useStyles();
  return (
    <div className="Header">
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.typo} variant="h6" component="div">
              Prescription
            </Typography>
            <GuestHeaderMenu />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
