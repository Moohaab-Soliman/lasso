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
    width: "auto",
    maxWidth: "10%",
    heith: "auto",
  },
  home: {
    width: "1.3em",
    height: "1.3em",
    marginLeft: "-.8em",
  },
  cart: {
    width: "1.2em",
    height: "1.2em",
    marginTop: ".2em",
    marginRight: "-.8em",
    color: "black",
  },
});

class Index extends Component {
  state = {
    userData: [],
    getSocialLinks: [],
    getUserWebLinks: [],
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
    const haha = params.userId.toLowerCase();

    console.log(params.userId.toLowerCase());
    fetch(`${haha}`)
      .then((response) =>
        db
          .collection("profile")
          .where("username", "==", haha)
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
            if (userData.length >= 1) {
              db.collection("profile")
                .doc(querySnapshot.docs[0].id)
                .collection("userWebLinks")

                .onSnapshot((mydata) => {
                  let getUserWebLinks = [];

                  mydata.forEach((doc) => {
                    getUserWebLinks.push(doc.data());
                    this.setState({
                      getUserWebLinks,
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
    const {
      isUserFound,
      isLoading,
      userData,
      getSocialLinks,
      getUserWebLinks,
    } = this.state;

    if (isLoading) return <h1 className="loader">.</h1>;
    if (!isUserFound) return <p>User not found</p>;

    return (
      <div className="App">
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
                // width="1.3em"
                // height="1.3em"
                viewBox="0 0 16 16"
                className={classes.home}
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
                className={classes.cart}
                // style={{
                //   width: "1.2em",
                //   height: "1.2em",
                //   color: "black",
                // }}
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
                  webLinks={getUserWebLinks.map((webLinks) => webLinks)}
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
        <footer>
          <div className="footerLinks">
            <ul>
              <a href="" target="_Blank">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/lasso-fc13c.appspot.com/o/images%2Fgoogle%20play.png?alt=media&token=6095f23a-b13c-4463-8ca4-dcc0547b114a"
                  width="150em"
                  style={{ margin: ".5em" }}
                />
              </a>
              <a href="" target="_Blank">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/lasso-fc13c.appspot.com/o/images%2Fapp%20store.png?alt=media&token=4c575413-0c22-438b-a2f3-cabccd3c9279"
                  width="150em"
                />
              </a>
              <br />
              <li>
                <a href="https://lassoshare.com/pages/tracking" target="_Blank">
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="https://lassoshare.com/pages/contact-us"
                  target="_Blank"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://lassoshare.com/pages/frequently-asked-questions"
                  target="_Blank"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a href="https://lassoshare.com/pages/shipping" target="_Blank">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="https://lassoshare.com/pages/terms-of-service"
                  target="_Blank"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://lassoshare.com/pages/privacy-policy"
                  target="_Blank"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <br />
          <div className="copyright">
            <p>© 2020 Lasso Tech LLC</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default withStyles(useStyles)(Index);
