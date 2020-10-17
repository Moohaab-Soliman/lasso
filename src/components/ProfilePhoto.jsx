import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > *": {
      margin: theme.spacing(-7),
    },
  },

  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(0),
  },
}));

const ProfilePhoto = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="Remy Sharp"
        src={props.profilePhoto}
        className={classes.large}
      />
    </div>
  );
};

export default ProfilePhoto;
