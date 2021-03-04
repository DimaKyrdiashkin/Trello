import React from 'react';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    zIndex: 2,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '6px 10px 30px -10px rgba(28, 28, 28, 0.12)',
    minWidth: '250px',
    maxWidth: '600px',
    padding: '50px 50px 25px'
  },
  box: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonClose: {
    alignSelf: 'flex-end',
    marginTop: '16px',
    marginLeft: '16px'
  },
  buttonDelete: {
    alignSelf: 'flex-start',
    marginTop: '16px',
    marginRight: '16px'
  }
}));

const PopUp = ({ description, close, eventDel, change }) => {
  const classes = useStyles();
  const delleteEvent = () => {
    fire
      .database()
      .ref(`calendar/${eventDel.start} ${eventDel.title}`)
      .remove();
    change();
    close();
  };

  return (
    <Grid className={classes.root}>
      <Box>{description}</Box>
      <Box className={classes.box}>
        <Button
          className={classes.buttonDelete}
          color="secondary"
          onClick={delleteEvent}
        >
          Delete
        </Button>
        <Button
          className={classes.buttonClose}
          onClick={close}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </Box>
    </Grid>
  );
};

export default PopUp;
