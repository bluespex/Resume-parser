import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { withFirebase } from "./Firebase";
import { withRouter } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = {
  paper: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "4px",
    backgroundColor: "#009688",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "16px",
  },
  submit: {
    margin: "16px 0px 8px",
  },
  upload: {
    margin: "20px 0px 12px",
  },
};

const INITIAL_STATE = {
  email: "",
  password: "",
  name: "",
  mobile: "",
  roll: "",
  skills: [],
  experience: [],
  error: null,
};

class CandidateDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    var uploadFile = null;
  }
  componentDidMount() {}
  // onUpload = (event) => {
  //     event.preventDefault();
  //     console.log("HELOO");
  //     console.log(this.uploadFile);
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({url:this.uploadFile}),
  //     };
  //     var userMatch
  //     fetch('http://localhost:5000/uploader', requestOptions)
  //         .then(response => response.json())
  //         .then(data => {
  //           console.log(data);
  //           // var keysSorted = Object.keys(data).sort(function(a,b){return data[b]-data[a]})
  //           // console.log(keysSorted);
  //           // // userMatch = data
  //           // this.props.firebase.db
  //           // .doc(`/users/${userId}`)
  //           // .update({ recommend: keysSorted });
  //         })
  //         .catch(err => console.log(err));
  // };
  onUpload = (event) => {
    event.preventDefault();
    console.log(this.uploadFile);
    if (this.uploadFile === null) {
      return;
    }
    const uploadTask = this.props.firebase.storage
      .ref(`/images/${this.uploadFile.name}`)
      .put(this.uploadFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        this.props.firebase.storage
          .ref("images")
          .child(this.uploadFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log(fireBaseUrl);
            this.state.image = fireBaseUrl;
            this.setState({ image: fireBaseUrl });

            const userId = this.props.firebase.auth.currentUser.uid;

            this.props.firebase.db
              .doc(`/users/${userId}`)
              .update({ resume: fireBaseUrl });

            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: this.state.image }),
            };
            console.log(JSON.stringify({ url: this.state.image }));
            var userMatch;
            fetch("http://localhost:5000/uploader", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                console.log(data.Email);
                // var keysSorted = Object.keys(data).sort(function(a,b){return data[b]-data[a]})
                // console.log(keysSorted);
                // // userMatch = data
                this.props.firebase.db.doc(`/users/${userId}`).update({
                  email: data.Email,
                  mobile: data.Mobile,
                  name: data.Name,
                  roll: data.RollNo,
                  experience: data.experience,
                  skills: data.skills,
                });
                this.setState({
                  email: data.Email,
                  mobile: data.Mobile,
                  name: data.Name,
                  roll: data.RollNo,
                  experience: data.experience,
                  skills: data.skills,
                });
                console.log(this.state);
              })
              .catch((err) => console.log(err));
            // console.log(userMatch);
          });
      }
    );
  };

  imageChange = (event) => {
    const imageFile = event.target.files[0];
    this.uploadFile = imageFile;
    console.log(this.uploadFile);
  };
  //   onSubmit = (event) => {
  //     const {
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       mobile,
  //       DOB,
  //       country,
  //     } = this.state;

  //     this.props.firebase
  //       .doCreateUserWithEmailAndPassword(email, password)
  //       .then((authUser) => {
  //         console.log(authUser.user.uid);
  //         const newUser = {
  //           email: this.state.email,
  //           firstName: this.state.firstName,
  //           lastName: this.state.lastName,
  //           mobile: this.state.mobile,
  //           DOB: this.state.DOB,
  //           country: this.state.country,
  //           image:
  //             "https://firebasestorage.googleapis.com/v0/b/dressify-59ab5.appspot.com/o/no-img.png?alt=media&token=e9f35f49-0354-49f6-bb26-7538a523b3a3",
  //         };
  //         return this.props.firebase.db
  //           .doc(`/users/${authUser.user.uid}`)
  //           .set(newUser);
  //       })
  //       .then(() => {
  //         this.setState({ ...INITIAL_STATE });
  //         this.props.history.push("/profile");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.setState({ error });
  //       });

  //     event.preventDefault();
  //   };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            APPLY
          </Typography>
          <Grid item xs={12}>
            <form onSubmit={this.onUpload} className={classes.form}>
              <input
                type="file"
                onChange={this.imageChange}
                className={classes.box}
              ></input>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.upload}
              >
                Upload
              </Button>
            </form>
          </Grid>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <TextField
                  autoComplete="fullname"
                  name="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  // autoFocus
                  value={this.state.name}
                  onChange={this.onChange}
                /> */}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoComplete="fullname"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.onChange}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="roll"
                  label="Roll Number"
                  type="roll"
                  id="roll"
                  autoComplete="roll"
                  value={this.state.roll}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="mobile"
                  value={this.state.mobile}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="DOB"
                  label="Date Of Birth"
                  name="DOB"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  autoComplete="DOB"
                  onChange={this.onChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="experience"
                  label="experience"
                  name="experience"
                  autoComplete="experience"
                  value={this.state.experience[0]}
                  onChange={this.onChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  onChange={this.onChange}
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              {this.state.skills.map((val, ind, ar) => {
                return (
                  <Grid>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="ind"
                      value={val}
                      onChange={this.onChange}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Search
            </Button>
            <Grid container justify="flex-end">
              {/* <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid> */}
            </Grid>
          </form>
        </div>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const Candidate = withRouter(
  withFirebase(withStyles(useStyles)(CandidateDetails))
);

export default Candidate;
