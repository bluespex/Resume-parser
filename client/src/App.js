import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { withFirebase } from "./components/Firebase";
import { withAuthentication } from "./components/Session";

//components
import Navbar from "./components/Navbar";

//Pages
import candidate from "./pages/candidate";
import signup from "./pages/signup";
import login from "./pages/login";
import cart from "./pages/cart";
import admin from "./pages/admin";
import landing from "./pages/landing";
import forpass from "./pages/forpass"
import passchange from "./pages/passchange"
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#c158dc",
      main: "#8e24aa",
      dark: "#5c007a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffc4ff",
      main: "#ce93d8",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
  },
});

class App extends Component {
  componentDidUnmount(){
    this.props.firebase.doSignOut();
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={landing} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/login" component={login} />
                <Route exact path="/admin" component={admin} />
                <Route exact path="/candidate" component={candidate} />
                <Route exact path="/forpass" component={forpass} />
                <Route exact path="/passchange" component={passchange} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withFirebase(withAuthentication(App));
