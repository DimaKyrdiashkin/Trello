import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const data = fire.database();
  const userUid = localStorage.getItem('userUid');

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile datefire={data} userinfo={userUid} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails datefire={data} userinfo={userUid} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
