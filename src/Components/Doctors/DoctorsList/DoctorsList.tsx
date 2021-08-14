import { Grid, makeStyles, Theme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import JwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notifications";
import DoctorCard from "../DoctorCard/DoctorCard";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "0 auto",
  },
  cardManager: {
    margin: theme.spacing(1),
  },
}));

function DoctorsList(): JSX.Element {
  const classes = useStyles();
  const [doctors, setDoctors] = useState<UserModel[]>([]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get<UserModel[]>(
          "http://localhost:8080/api/guest/getAllDoctors"
        );
        setDoctors(response.data);
      } catch (err) {
        notify.error(err);
      }
    };

    fetchAllDoctors();
  });

  return (
    <div className="DoctorsList">
      <div className={classes.root}>
        <Grid container justify="center">
          {doctors.map((doctor) => (
            <Grid className={classes.cardManager} key={doctor.id} item>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default DoctorsList;
