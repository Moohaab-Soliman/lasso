import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Avatar from "@material-ui/core/Avatar";
import SocialIcons from "./SocialIcons";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      height: theme.spacing(12),
    },
  },
  large: {
    // display: "flex",
    // width: theme.spacing(6.5),
    // height: theme.spacing(6),
    width: "2.5em",
    height: "2.5em",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(-5),
    backgroundColor: "rgb(249, 246, 246)",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  paperText: {
    textAlign: "left",
    fontWeight: "Bold",
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(1.5),
  },
  paperdescription: {
    textAlign: "left",
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(-1),
  },

  paper: {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    height: theme.spacing(10),
    marginBottom: theme.spacing(2.8),
    marginTop: theme.spacing(2),
    minWidth: theme.spacing(40),
    width: "70%",
  },
  small: {},
}));

const FirstStyle = (props) => {
  const classes = useStyles();
  const { socials, message, webLinks } = props;

  return (
    <div>
      <SocialIcons socials={socials} message={message} />
      {console.log(webLinks)}
      {webLinks !== undefined
        ? webLinks.map((item, uid) => {
            return (
              <div key={uid}>
                <div className={classes.root}>
                  <Avatar
                    variant="square"
                    alt={item.title}
                    src={item.img}
                    className={classes.large}
                  />

                  <Paper className={classes.paper}>
                    <a
                      style={{ color: "Black" }}
                      href={"http://" + item.link}
                      target="_Blank"
                      rel="noopener noreferrer"
                    >
                      <p className={classes.paperText}>{item.link}</p>
                      <p className={classes.paperdescription}>{item.title}</p>
                    </a>
                  </Paper>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default FirstStyle;
