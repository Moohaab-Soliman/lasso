import React, { Component } from "react";
import "../App.css";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import UserData from "./UserData";
import FirstStyle from "./FirstStyle";
import SecondStyle from "./SecondStyle";
import firebase from "../Firebase";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";
const useStyles = (theme) => ({
  logo: {
    // width: theme.spacing(15),
    // height: theme.spacing(10),
    // position: "center",
    // display: "block",
    // marginLeft: "auto",
    // marginRight: "auto",
    // maxWidth: "15%",
    width: "auto",
    maxWidth: "10%",
    heith: "auto",
  },
});

class Index extends Component {
  state = {
    userData: [],
    getSocialLinks: [],
    isUserFound: true,
    isLoading: true,
  };

  handleConsole = () => {
    const db = firebase.firestore();

    const {
      match: { params },
    } = this.props;

    if (params.id != null) {
      db.collection("profile")
        .where("username", "==", params.userId)
        .get()
        .then((value) => {
          db.collection("profile")
            .doc(value.docs[0].id)
            .update({
              nOfTabs: firebase.firestore.FieldValue.increment(1),
            });
        });
    }

    fetch(`${params.userId}`)
      .then((response) =>
        db
          .collection("profile")
          .where("username", "==", params.userId)
          .onSnapshot((querySnapshot) => {
            this.setState({ isLoading: false });
            let userData = [];
            querySnapshot.docs.length > 0
              ? this.setState({ isUserFound: true })
              : this.setState({ isUserFound: false });

            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
              this.setState({ userData });
            });
            if (userData.length >= 1) {
              db.collection("profile")
                .doc(querySnapshot.docs[0].id)
                .collection("userSocialLinks")

                .onSnapshot((mydata) => {
                  let getSocialLinks = [];

                  mydata.forEach((doc) => {
                    getSocialLinks.push(doc.data());
                    this.setState({
                      getSocialLinks,
                    });
                  });
                });
            } else {
            }
          })
      )
      .catch((error) => {
        // Code for handling the error
      });
  };

  componentDidMount() {
    this.handleConsole();
  }

  render() {
    const { classes } = this.props;
    const { isUserFound, isLoading, userData, getSocialLinks } = this.state;

    if (isLoading) return <h1 className="loader">.</h1>;
    if (!isUserFound) return <p>User not found</p>;

    return (
      <div className="App">
        {/* <nav className="navbar navbar-light bg-light">
          <a href="#">
            <center>
              <img
                className={classes.logo}
                alt="lasso"
                src="https://firebasestorage.googleapis.com/v0/b/lasso-fc13c.appspot.com/o/1.2.png?alt=media&token=9f121326-87b1-4320-98e2-f8c9426b688d"
              />
            </center>
          </a>
        </nav> */}
        <center>
          <nav
            className="navbar navbar-light bg-light"
            style={{ width: "830px", maxWidth: "100%" }}
          >
            <a
              className="navbar-brand"
              href="https://www.lassoshare.com"
              target="_Blank"
              rel="noopener noreferrer"
            >
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-house-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                />
              </svg>
            </a>

            <img
              alt="lasso"
              width="90em"
              src="https://firebasestorage.googleapis.com/v0/b/lasso-fc13c.appspot.com/o/1.2.png?alt=media&token=9f121326-87b1-4320-98e2-f8c9426b688d"
            />

            <a
              href="https://lassoshare.com/collections/all"
              target="_Blank"
              rel="noopener noreferrer"
            >
              <ShoppingCartSharpIcon
                style={{
                  width: "1.8em",
                  height: "1.8em",
                  color: "black",
                }}
              />
            </a>
          </nav>
        </center>

        {userData.map((message) => {
          return message.directOn === true ? (
            <Route component={() => (window.location = message.hLink)} />
          ) : (
            <div key={message.uid}>
              <CoverPhoto cover={message.coverPhoto} />
              <ProfilePhoto profilePhoto={message.profilePhoto} />
              <UserData message={message} />

              {message.isBusiness === true ? (
                <FirstStyle
                  socials={getSocialLinks.map((social) => social)}
                  message={message}
                />
              ) : (
                <SecondStyle
                  socials={getSocialLinks.map((social) => social)}
                  message={message}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(useStyles)(Index);
