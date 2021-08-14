import { Redirect, Route, Switch } from "react-router-dom";
import Logout from "../../Auth/Logout/Logout";
import Doctors from "../../Doctors/Doctors";
import Home from "../../Home/Home";
import AddPrescription from "../../Prescriptions/AddPrescription/AddPrescription";
import Page404 from "../../Shared/Page404/Page404";

function Router(): JSX.Element {
  return (
    <div className="Router">
      <Switch>
        <Route path="/logout" component={Logout} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/doctors" component={Doctors} exact />
        <Route
          path="/doctors/add-prescription"
          component={AddPrescription}
          exact
        />
        <Redirect from="/" to="/home" />
        {/* <Route component={Page404} /> */}
      </Switch>
    </div>
  );
}

export default Router;
