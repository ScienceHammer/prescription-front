import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header/Header";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // boxSizing: "border-box",
    // position: "relative",
  },
  main: {
    // width: "100%",
    // minHeight: "100vh",
  },
}));

function Layout(): JSX.Element {
  const classes = useStyles();
  return (
    <div className="Layout">
      <BrowserRouter>
        <Grid className={classes.root} container direction="column">
          <Grid item>
            <header>
              <Header />
            </header>
          </Grid>
          <Grid container item direction="row">
            <Grid item lg={2} />
            <Grid item lg={8} className={classes.main}>
              <main>{/* <Router /> */}</main>
            </Grid>
            <Grid item lg={2} />
          </Grid>
          <Grid item>
            <footer>{/* <Footer /> */}</footer>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
