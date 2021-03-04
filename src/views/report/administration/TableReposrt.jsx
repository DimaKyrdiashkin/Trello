import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

const TableReposrt = ({ arrayReport }) => {
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Info</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayReport.map((value, index) => (
            <TableRow key={index}>
              <TableCell>{value.name}</TableCell>
              <TableCell>{value.report.text}</TableCell>
              <TableCell>{value.report.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TableReposrt;
