import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ReportTable from './ReportTable';
import FormAddReport from './FormAddReport';
import AdminReposrt from './administration';
import fire from 'src/config/fire-conf';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Report = () => {
  const [statusUser, setStatusUser] = useState(null);
  const [arrayReport, setArrayReport] = useState([]);

  useEffect(() => {
    const userUid = localStorage.getItem('userUid');
    fire
      .database()
      .ref(`user/${userUid}/rank/position`)
      .once('value', data => {
        setStatusUser(data.val());
      });
  }, []);

  const classes = useStyles();

  return (
    <Page className={classes.root} title="Report">
      <Container maxWidth="lg">
        <Box>
          <FormAddReport setArray={setArrayReport} />
          <Box mt={3}>
            <ReportTable addReport={arrayReport} setReport={setArrayReport} />
          </Box>
        </Box>
        {statusUser >= 30 && (
          <Box>
            <AdminReposrt />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default Report;
