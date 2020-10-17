import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    '& > *': {
      height :theme.spacing(20),

    },
  },
}));


const CoverPhoto = (props) => {
  const classes = useStyles();


  return ( 
    <div className={classes.root}>
    <img src={props.cover} width="108%"  alt="..." />

    </div>
   );
}
 
export default CoverPhoto;

