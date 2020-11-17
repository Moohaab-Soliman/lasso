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
  let handleLinks = "";
  let handleWww = "";
  const classes = useStyles();
  const { socials, message } = props;
  return (
    <div className="scrollmenu">
      {socials.map(
        (social, uid) => (
          (handleLinks =
            social.username.length > 8 ||
            social.username.includes("http") ||
            social.username.includes("https") ||
            social.username.includes("www")
              ? social.username
              : handleWww + social.username),
          (
            <React.Fragment key={uid}>
              <a href={handleLinks} target="_Blank" rel="noopener noreferrer">
                <Avatar
                  alt=""
                  src={
                    message.isMinimal === false ? social.img : social.imgMinimal
                  }
                  className={classes.small}
                />
              </a>
            </React.Fragment>
          )
        )
      )}
    </div>
  );
};

export default SocialIcons;
