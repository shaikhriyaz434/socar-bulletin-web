import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import  '../../App.css'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
});

export default function HeaderLayout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center"  gutterBottom>
          Bulletin Board 
        </Typography>

        <Typography  align="center"  gutterBottom>
        <Link to="/" >Home</Link> || <Link to="/new">Add New Item</Link>
        </Typography>

      </Container>
</div>);
}