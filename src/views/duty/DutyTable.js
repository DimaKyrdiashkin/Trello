import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CheckSquare } from 'react-feather';
import moment from 'moment';

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'date', label: 'Date', minWidth: 200 }
];

const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      overflowX: 'auto'
    },
    firstCell: {
      left: 0,
      position: 'sticky',
      zIndex: 99
    },
    cell: {
      position: 'relative'
    },
    checkSquare: {
      position: 'absolute',
      top: '50%',
      right: 24,
      transform: 'translateY(-50%)',
      stroke: '#32cd32'
    }
  };
});

const DutyTable = ({ allDate }) => {
  const classes = useStyles();
  const curentDateTime = moment(new Date()).format('YYYY-MM-DD');

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allDate.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={index}
                        align={column.align}
                        className={
                          index === 0 ? classes.firstCell : classes.cell
                        }
                        style={{
                          wordWrap: 'normal',
                          whiteSpace: 'break-spaces',
                          background: '#f4f6f8'
                        }}
                      >
                        {value}
                        {index === 1 && value < curentDateTime && (
                          <CheckSquare className={classes.checkSquare} />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DutyTable;
