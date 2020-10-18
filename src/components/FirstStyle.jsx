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
      width: "90%",
      height: theme.spacing(12),
    },
  },
  large: {
    display: "flex",
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(-6),
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
  arrow: {
    display: "flex",
    marginLeft: theme.spacing(35),
    marginTop: theme.spacing(-6),
  },
  paper: {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    height: theme.spacing(10),
    marginBottom: theme.spacing(2.8),
    marginTop: theme.spacing(2),
  },
  small: {},
}));

const FirstStyle = (props) => {
  const classes = useStyles();
  const { socials, message } = props;

  return (
    <div>
      <SocialIcons socials={socials} message={message} />
      {message.webLinks !== undefined
        ? message.webLinks.map((item, uid) => {
            return (
              <div key={uid}>
                <div className={classes.root}>
                  <Avatar
                    variant="square"
                    alt={item.subtitle}
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
                      <p className={classes.paperdescription}>
                        {item.subtitle}
                      </p>
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
