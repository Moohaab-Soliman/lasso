import React, { Component } from "react";
import "../App.css";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import UserData from "./UserData";
import FirstStyle from "./FirstStyle";
import SecondStyle from "./SecondStyle";
import firebase from "../Firebase";
import axios from "axios";

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

    // if (params.id != null) {
    //   db.collection("profile")
    //     .where("username", "==", params.userId)
    //     .get()
    //     .then((value) => {
    //       db.collection("profile")
    //         .doc(value.docs[0].id)
    //         .update({
    //           nOfTabs: firebase.firestore.FieldValue.increment(1),
    //         });
    //     });
    // }

    axios
      .get(`${params.userId}`)
      .then(
        console.log(params.userId, params.id)
        // db
        //   .collection("profile")
        //   .where("username", "==", params.userId)
        //   .onSnapshot((querySnapshot) => {
        //     console.log(querySnapshot);
        //     this.setState({ isLoading: false });
        //     let userData = [];
        //     querySnapshot.docs.length > 0
        //       ? this.setState({ isUserFound: true })
        //       : this.setState({ isUserFound: false });

        //     querySnapshot.forEach((doc) => {
        //       userData.push(doc.data());
        //       this.setState({ userData });
        //     });
        //     if (userData.length >= 1) {
        //       db.collection("profile")
        //         .doc(querySnapshot.docs[0].id)
        //         .collection("userSocialLinks")
        //         .get()
        //         .then((mydata) => {
        //           let getSocialLinks = [];

        //           mydata.forEach((doc) => {
        //             getSocialLinks.push(doc.data());
        //             this.setState({
        //               getSocialLinks,
        //             });
        //           });
        //         });
        //     } else {
        //     }
        //   })
      )
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
        <h1>hey there</h1>
      </div>
    );
  }
}

export default Index;
