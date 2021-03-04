import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [arrayUser, setArrayUser] = useState([]);

  const fireDate = () => {
    fire
      .database()
      .ref('user')
      .on('child_added', data => {
        setArrayUser(prevState => [
          ...prevState,
          {
            id: data.key,
            address: `${data.val().info.city} ${data.val().info.country}`,
            avatarUrl: data.val().info.avatarUrl,
            name: `${data.val().info.firstName} ${data.val().info.lastName}`,
            telegram: data.val().info.telegram,
            phone: data.val().info.phone,
            createdAt: data.val().createdAt
          }
        ]);
      });
  };

  useEffect(fireDate, []);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Results customers={arrayUser} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
