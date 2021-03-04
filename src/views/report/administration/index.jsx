import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card } from '@material-ui/core';
import fire from 'firebase';
import { FormAdmin } from './FormReport';
import TableReposrt from './TableReposrt';

const AdminReposrt = () => {
  const [arrayUser, setArrayUser] = useState([]);
  const [infoSearch, setInfoSearch] = useState({
    department: '',
    date: ''
  });

  const searchReport = () => {
    fire
      .database()
      .ref('user')
      .orderByChild('rank/department')
      .equalTo(infoSearch.department)
      .on('child_added', dataUser => {
        arrayReport(
          dataUser.key,
          `${dataUser.val().info.lastName} ${dataUser.val().info.firstName}`
        );
      });
  };

  const arrayReport = (userId, name) => {
    return fire
      .database()
      .ref(`report_day/${userId}/${infoSearch.date}`)
      .on('child_added', data => {
        setArrayUser(prevState => [
          ...prevState,
          {
            name: name,
            report: data.val()
          }
        ]);
      });
  };

  const refindReport = () => {
    setArrayUser([]);
    searchReport();
  };

  useEffect(refindReport, [infoSearch]);

  return (
    <Card>
      <PerfectScrollbar>
        <Box>
          <FormAdmin setForm={setInfoSearch} />
        </Box>
        <TableReposrt arrayReport={arrayUser} />
      </PerfectScrollbar>
    </Card>
  );
};

export default AdminReposrt;
