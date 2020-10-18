import React, { Component } from "react";
import "../App.css";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import UserData from "./UserData";
import FirstStyle from "./FirstStyle";
import SecondStyle from "./SecondStyle";
import firebase from "../Firebase";

class Index extends Component {
  state = {
    userData: [],
    getSocialLinks: [],
    isUserFound: true,
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

    const getParams = fetch(`${params.userId}`);

    getParams
      .then((response) => {
        db.collection("profile")
          .where("username", "==", params.userId)
          .onSnapshot((querySnapshot) => {
            const userData = [];

            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
              this.setState({ userData });
            });
            if (userData.length >= 1) {
              db.collection("profile")
                .doc(querySnapshot.docs[0].id)
                .collection("userSocialLinks")
                .get()
                .then((mydata) => {
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
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
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
        {userData.map((message) => {
          return (
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
