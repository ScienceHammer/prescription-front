import { Grid, Theme, makeStyles } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header/Header";
import Router from "./Router/Router";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
    boxSizing: "border-box",
    position: "relative",
  },
  main: {
    width: "100%",
    minHeight: "100vh",
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
            <Grid item md={2} />
            <Grid item md={8} className={classes.main}>
              <main>
                <Router />
              </main>
            </Grid>
            <Grid item md={2} />
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
