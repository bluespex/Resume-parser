import React, { Component } from "react";
import Admin from "../components/Admin";

export default class admin extends Component {
  render() {
    return (
      <div>
        <div className="profile-sexy">
          <h1> Admin</h1>
        </div>
        <Admin />
      </div>
    );
  }
}
