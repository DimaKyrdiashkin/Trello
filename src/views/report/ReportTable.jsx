import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import { Delete } from 'react-feather';

import fire from 'src/config/fire-conf';

const ReportTable = ({ addReport, setReport }) => {
  const dataFire = fire.database();
  const [arrayReport, setArrayReport] = useState([]);
  useEffect(() => {
    setArrayReport([]);
    dataFire
      .ref(`report_day/${localStorage.getItem('userUid')}`)
      .limitToLast(31)
      .on('child_added', data => {
        setArrayReport(prevState => [
          ...prevState,
          {
            date: data.key,
            report: data.val()
          }
        ]);
      });
  }, [addReport]);
  const deleteReport = e => {
    dataFire
      .ref(
        `report_day/${localStorage.getItem('userUid')}/${e.target.getAttribute(
          'data-del'
        )}`
      )
      .remove()
      .then(() => {
        setReport([]);
      });
  };
  return (
    <Card>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrayReport.reverse().map(value => {
                let numberTime = 0;
                let quantity = 0;
                console.log(value.report);
                return (
                  <TableRow key={value.date}>
                    <TableCell>{value.date}</TableCell>
                    <TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Report</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Del</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {value.report.map((val, i) => {
                            numberTime += parseFloat(val.time);
                            quantity += 1;

                            return (
                              <TableRow key={i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{val.text}</TableCell>
                                <TableCell>{val.time}</TableCell>
                                <TableCell>
                                  <Delete
                                    onClick={deleteReport}
                                    data-del={`${value.date}/${i}`}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          {quantity > 1 && (
                            <TableRow>
                              <TableCell>
                                <h2>{quantity}</h2>
                              </TableCell>
                              <TableCell />
                              <TableCell>
                                <h2>{numberTime}</h2>
                              </TableCell>
                              <TableCell />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default ReportTable;
