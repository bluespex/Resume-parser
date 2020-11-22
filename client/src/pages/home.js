import React, { Component } from "react";
import Company from "../components/Company";
import Grid from "@material-ui/core/Grid";
import { withFirebase } from "../components/Firebase";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ele : [],
        userId:"",
    }
  }
  
  componentDidMount() {
    this.state.userId = this.props.firebase.auth.currentUser.uid;
    // this.props.firebase.db
    //   .doc(`/users/${userId}`)
    //   .get()
    //   .then((snapshot) => {
    //     const curUser = snapshot.data().recommend;
    //     // console.log(snapshot.data());
    //     this.setState({recommend : curUser});
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    
    console.log("hello");
    this.props.firebase.db
      .collection("recruiters")
      .get()
      .then((querySnapshot) => {
        var ar = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id);  
          ar.push(doc)
        });
        console.log(ar);
        this.setState({ele : ar})
        console.log(this.state);
      });

  }

  render() {
    return (
      <div>
        <h1><b>Available jobs</b></h1>
        <Grid container justify="center">
          {this.state.ele.map((val, ind, ar) => {
            return <Company id={ind} company={val} user={this.state.userId}/> ;
          })}
        </Grid>
      </div>
      // <div>
      //   <h1>hello</h1>
      // </div>
    );
  }
}

export default withFirebase(home);
