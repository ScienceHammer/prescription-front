import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import UserModel from "../../../Models/UserModel";

const useStyles = makeStyles((theme: Theme) => ({
  displayCard: {
    boxSizing: "border-box",
    boxShadow: theme.shadows[5],
    width: 280,
    height: 430,
    margin: "0 auto",
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    maxHeight: 250,
  },
  img: {
    width: "100%",
    height: 250,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

function DoctorCard(props: { doctor: UserModel }): JSX.Element {
  const classes = useStyles();
  return (
    <div className="DoctorCard">
      <Card className={classes.displayCard}>
        <CardActionArea className={classes.cardActionArea}>
          <div className={classes.img}>
            <CardMedia
              component="img"
              className={classes.media}
              image=""
              title="Contemplative Reptile"
            />
          </div>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="body1" color="textPrimary">
              Id: {props.doctor.id}
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary">
              Name: {props.doctor.firstName + " " + props.doctor.lastName}
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary">
              Email: {props.doctor.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary">
            Info
          </Button>
          <Button size="small" color="primary">
            message
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default DoctorCard;
