import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = makeStyles((theme) => ({
  small: {
    // width: "100%",
    // height: "100%",
    minWidth: theme.spacing(19),
    minHeight: theme.spacing(19),

    marginBottom: theme.spacing(1),
  },
}));

const SecondStyle = (props) => {
  const classes = styles();
  const { socials, message } = props;
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col"></div>

          <div className="col">
            <div className="wrapper">
              {socials.map((social, uid) => (
                <div key={uid}>
                  <a
                    href={social.link + "/" + social.username}
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
              ))}
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default SecondStyle;
