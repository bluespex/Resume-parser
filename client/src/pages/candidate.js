import React, { Component } from "react";
import Candidate from "../components/Candidate";

export default class admin extends Component {
  render() {
    return (
      <div>
        <div className='profile-sexy'>
          <h1> Candidate</h1>
        </div>
        <Candidate/>
      </div>
    );
  }
}
