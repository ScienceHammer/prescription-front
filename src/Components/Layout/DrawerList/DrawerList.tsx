import {
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Role } from "../../../Models/RoleEnum";
import store from "../../../Redux/Store";

function DrawerList() {
   const [role, setRole] = useState<Role>(
      store.getState().authState.user?.role
   );
   //   useEffect(() => {
   //     store.subscribe(() => {
   //       setRole(store.getState().authState.user?.role);
   //     });
   //   });
   return (
      <List>
         <NavLink to="/home">
            <ListItem button>
               <ListItemText primary="Home" />
            </ListItem>
         </NavLink>
         <NavLink to="/doctors">
            <ListItem button>
               <ListItemText primary="Doctors" />
            </ListItem>
         </NavLink>
         {(role === Role.Doctor || role === Role.User) && (
            <div>
               <NavLink to="/doctors/show-prescriptions">
                  <ListItem button>
                     <ListItemText primary="Prescriptions" />
                  </ListItem>
               </NavLink>

               <ListItem button>
                  <ListItemText primary="Mails" />
               </ListItem>
            </div>
         )}
         {role === Role.Doctor && (
            <NavLink to="/doctors/add-prescription">
               <ListItem button>
                  <ListItemText primary="Create Prescription" />
               </ListItem>
            </NavLink>
         )}
      </List>
   );
}

export default DrawerList;
