import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  small: {},
}));
const SocialIcons = (props) => {
  const classes = useStyles();
  const { socials, message } = props;
  return (
    <div className="scrollmenu">
      {socials.map((social, uid) => {
        return (
          <a
            key={uid}
            href={social.link + "/" + social.username}
            target="_Blank"
            rel="noopener noreferrer"
          >
            <Avatar
              alt=""
              src={message.isMinimal === false ? social.img : social.imgMinimal}
              className={classes.small}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
