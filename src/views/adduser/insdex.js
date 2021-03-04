import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import FormAddUser from './FormAddUser';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AddUser = () => {
  const classes = useStyles();
  const data = fire.database();
  const user = localStorage.getItem('userUid');
  const [useAdmin, setUserAdmin] = useState(false);
  const initComponentUser = () => {
    data
      .ref(`user/${user}/rank/position`)
      .once('value')
      .then(data => {
        if (data.val() >= 40) {
          setUserAdmin(true);
        }
      });
  };
  useEffect(initComponentUser, []);
  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        {useAdmin ? <FormAddUser datefire={data} userinfo={fire.auth()} /> : ''}
      </Container>
    </Page>
  );
};

export default AddUser;
