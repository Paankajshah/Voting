import React, { Component } from "react";
import classes from "./landing.module.css";
import { store } from "../../store";
import { setCurrentUser, addError, removeError } from "../../store/actions";
import decode from "jwt-decode";
import { Link, animateScroll as scroll } from "react-scroll";
if (localStorage.loginToken) {
  // setToken(localStorage.jwtToken);
  try {
    const data = decode(localStorage.loginToken);
    const finalData = {
      name: data.name,
      username: data.username,
      email: data.email,
    };
    store.dispatch(setCurrentUser(finalData));
    store.dispatch(removeError());
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError());
  }
}

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.link}>
        <Link
          activeClass="active"
          to="buttons"
          spy={true}
          smooth={true}
          offset={-70}
          duration={800}
        >
          Explore
        </Link>
      </div>
    </div>
  );
}

function Buttons({ props }) {
  return (
    <div className={classes.buttons} id="buttons">
      <div
        className={classes.candidate}
        onClick={() => props.history.push("/candidate")}
      >
        Apply <br />
        for
        <br /> Candidate
      </div>

      <div
        className={classes.voter}
        onClick={() => props.history.push("/voter")}
      >
        Apply <br />
        for <br />
        Voter
      </div>
      <div
        className={classes.cast}
        onClick={() => props.history.push("/login")}
      >
        Cast
        <br /> a<br /> Vote
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className={classes.intro}>
      Hi!!! <br />
      Welcome To <br />
      Blockchain Enabled Voting Project
    </div>
  );
}

function Contact() {
  return <div className={classes.contact}>We are developers</div>;
}
const Landing = (props) => {
  return (
    <div className={classes.container}>
      <Header />
      <Intro />
      <Buttons props={props} />
      <Contact />
    </div>
  );
};
export default Landing;
