import React, { useState, useEffect } from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Table from './DutyTable';
import FormAddDuty from './FormAddDuty';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Duty = () => {
  const classes = useStyles();
  const [innitView, setInnitView] = useState(false);
  const [updateDutyTable, setUpdateDutyTable] = useState(false);
  const [arrayDuty, setArrayDuty] = useState([]);

  useEffect(() => {
    setArrayDuty([]);
    fire
      .database()
      .ref('duty')
      .limitToLast(12)
      .on('child_added', data => {
        setArrayDuty(prevState => [
          ...prevState,
          {
            name: `${data.val().name}`,
            date: `${data.key}`
          }
        ]);
      });
  }, [updateDutyTable]);

  const accessRights = () => {
    const userUid = localStorage.getItem('userUid');
    fire
      .database()
      .ref(`user/${userUid}/rank/position`)
      .once('value', data => {
        data.val() >= 30 && setInnitView(true);
      });
  };

  useEffect(accessRights, []);

  const updateTable = () => {
    setUpdateDutyTable(prevState => !prevState);
  };

  return (
    <Page className={classes.root}>
      <Container maxWidth="lg">
        <Table allDate={arrayDuty} />
        {innitView && (
          <Box mt={3}>
            <FormAddDuty update={updateTable} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default Duty;
