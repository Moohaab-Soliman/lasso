import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = makeStyles((theme) => ({
  small: {
    width: "7em",
    height: "auto",
    // height: "100%",
    // minWidth: theme.spacing(18),
    // minHeight: theme.spacing(18),
  },
}));

const SecondStyle = (props) => {
  let handleLinks = "";
  const classes = styles();
  const { socials, message } = props;
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col"></div>

          <div className="col">
            <div className="wrapper">
              {socials.map(
                (social, uid) => (
                  (handleLinks =
                    social.username.length > 8 ||
                    social.username.includes("http") ||
                    social.username.includes("https") ||
                    social.username.includes("www")
                      ? social.username
                      : social.link + "/" + social.username),
                  (
                    <div key={uid}>
                      <a
                        href={handleLinks}
                        target="_Blank"
                        rel="noopener noreferrer"
                      >
                        <center>
                          <Avatar
                            alt="Remy Sharp"
                            src={
                              message.isMinimal === false
                                ? social.img
                                : social.imgMinimal
                            }
                            className={classes.small}
                          />
                        </center>
                      </a>
                    </div>
                  )
                )
              )}
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default SecondStyle;
