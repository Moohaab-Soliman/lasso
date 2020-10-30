import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > *": {
      height: theme.spacing(30),
    },
  },
  cover: {
    maxWidth: "107%",
  },
}));

const CoverPhoto = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.cover}
        src={props.cover}
        width="820px"
        height="auto"
        alt="cover photo"
      />
    </div>
  );
};

export default CoverPhoto;
