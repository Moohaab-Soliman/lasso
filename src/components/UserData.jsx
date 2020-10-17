import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LocationIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > *": {
      margin: theme.spacing(2),
    },
  },
  name: {
    fontWeight: "bolder",
    display: "flex",
    justifyContent: "center",
  },
  id: {
    display: "flex",
    opacity: 0.4,
    justifyContent: "center",
    marginTop: theme.spacing(-2.2),
  },
  locationText: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    opacity: 0.5,
  },
  job: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  button: {
    backgroundColor: "Transparent",
    width: theme.spacing(13),
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: "1px",
    margin: theme.spacing(0.5),
    display: "inline-block",
    marginBottom: theme.spacing(2),
  },
}));

const UserData = (props) => {
  const { message } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <p className={classes.name}>{message.displayName}</p>

        <Typography variant="subtitle2" className={classes.id}>
          @{message.username}
        </Typography>

        <div className={classes.locationText}>
          <LocationIcon />
          <Typography variant="subtitle2">{message.location}</Typography>
        </div>

        <p className={classes.job}>{message.position}</p>
        <div>
          {message.isEmailEnabled === true ? (
            <a href={"mailto: " + message.email}>
              <button className={classes.button}>
                <EmailIcon /> Email
              </button>
            </a>
          ) : null}
          {message.isNumEnabled === true ? (
            <a href={"tel: " + message.number}>
              <button className={classes.button}>
                <CallIcon /> Call
              </button>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserData;
