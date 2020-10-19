import React, { Component } from "react";
import "../App.css";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import UserData from "./UserData";
import FirstStyle from "./FirstStyle";
import SecondStyle from "./SecondStyle";
import firebase from "../Firebase";

import { Route } from "react-router-dom";

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
    const { isUserFound, isLoading, userData, getSocialLinks } = this.state;

    if (isLoading) return <h1 className="loader">.</h1>;
    if (!isUserFound) return <p>User not found</p>;

    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img
              alt="lasso"
              src="https://firebasestorage.googleapis.com/v0/b/lasso-fc13c.appspot.com/o/1.2.png?alt=media&token=9f121326-87b1-4320-98e2-f8c9426b688d"
              width="20%"
            />
          </a>
        </nav>
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

export default Index;
