import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withFirebase } from "./Firebase";
import firebase from 'firebase/app';
// import { withFirebase } from "../components/Firebase";
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import ShareIcon from '@material-ui/icons/Share';

const useStyles = {
  cardGrid: {
    paddingTop: "8px",
    paddingBottom: "8px",
    marginLeft:"40px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0px",
    // marginLeft:"80px",
  },
  cardMedia: {
    width: "400px",
    height: "400px",
    "object-fit" :"cover",
  },
  cardContent: {
    flexGrow: 1,
  },
  expand: {
    marginLeft: '80px',
  },
  algn:{
    margin: "auto",
    width: "50%",
  },
};

class Company extends Component {
    constructor(props) {
        super(props);
    }
    onSubmit = (event) =>{
        console.log(this.props.company.id);
        var companyId = this.props.company.id;
        const userId = this.props.user;
        event.preventDefault();
        this.props.firebase.db
        .collection("recruiters").doc(companyId)
        .update({
            candidates:firebase.firestore.FieldValue.arrayUnion(userId)
        })
    }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid id={this.props.id} item className={classes.cardGrid}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}  
              image={this.props.company.data().image}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                  <b>Company : </b>
                {this.props.company.data().companyName}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                  <b>Apply For : </b>
                {this.props.company.data().position}
              </Typography>
              {/* <Typography>type</Typography> */}
            </CardContent>
            <CardActions disableSpacing>
            {/* <Button 
            //   startIcon ={<AddShoppingCartIcon/>}
              size="small" 
              color="primary"
              onClick ={this.onSubmit}
              >
                Apply
              </Button> */}
               <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onSubmit}
                // className={classes.upload}
              >
                Apply
              </Button>
              {/* <Button 
              className = {classes.algn}
              startIcon ={<FavoriteIcon/>}
              size="small" 
              color="primary">
                WishList
              </Button>
              <Button 
              className = {classes.expand}
              startIcon ={<ShareIcon/>}
              size="small" 
              color="primary">
                Share
              </Button>               */}
            </CardActions>
          </Card>
    </Grid>
    </div>
    );
  }
}

export default withFirebase(withStyles(useStyles)(Company));
