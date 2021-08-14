import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Role } from "../../../Models/RoleEnum";
import store from "../../../Redux/Store";

function DrawerList() {
  const [role, setRole] = useState<Role>(store.getState().authState.user?.role);
  //   useEffect(() => {
  //     store.subscribe(() => {
  //       setRole(store.getState().authState.user?.role);
  //     });
  //   });
  return (
    <List>
      <NavLink to="/home">
        <ListItem button>
          {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
      <NavLink to="/doctors">
        <ListItem button>
          {/* <ListItemIcon>
          <MailIcon />
        </ListItemIcon> */}
          <ListItemText primary="Doctors" />
        </ListItem>
      </NavLink>
      {(role === Role.Doctor || role === Role.User) && (
        <div>
          <ListItem button>
            {/* <ListItemIcon>
          <MailIcon />
        </ListItemIcon> */}
            <ListItemText primary="Prescriptions" />
          </ListItem>
          <ListItem button>
            {/* <ListItemIcon>
          <MailIcon />
        </ListItemIcon> */}
            <ListItemText primary="Mails" />
          </ListItem>
        </div>
      )}
      {role === Role.Doctor && (
        <NavLink to="/doctors/add-prescription">
          <ListItem button>
            {/* <ListItemIcon>
       <MailIcon />
     </ListItemIcon> */}
            <ListItemText primary="Create Prescription" />
          </ListItem>
        </NavLink>
      )}
    </List>
  );
}

export default DrawerList;
