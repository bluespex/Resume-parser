import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShareIcon from "@material-ui/icons/Share";

import { withFirebase } from "./Firebase";

const useStyles = {
  cardGrid: {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "10px",
  },
  cardMedia: {
    width: "300px",
    height: "400px",
  },
  cardContent: {
    flexGrow: 1,
  },
  expand: {
    marginLeft: "auto",
  },
  algn: {
    margin: "auto",
    width: "50%",
  },
};

const INITIAL_STATE = {
  name: "",
  email: "",
  mobile: "",
  image: "",
  error: null,
};

class CandidateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    var userId = this.props.uid;
    console.log(userId);
    this.props.firebase.db
      .doc(`/users/${userId}`)
      .get()
      .then((snapshot) => {
        var curUser = snapshot.data();
        console.log(snapshot.data());
        this.setState(curUser);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(this.state);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* {this.props.uid} */}
        <Grid id={this.props.uid} item>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.email}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.mobile}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={this.onSubmit}
            >
              Send Email
            </Button>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default withFirebase(withStyles(useStyles)(CandidateProfile));
