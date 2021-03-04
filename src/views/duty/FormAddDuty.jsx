import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(() => ({
  root: {}
}));

const FormAddDuty = ({ className, datefire, userinfo, update, ...rest }) => {
  const classes = useStyles();
  const dataFirebase = fire.database();
  const [arrayEmployees, setArrayEmployees] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const dutyData = {
      date: data.date,
      name: data.name
    };
    dataFirebase
      .ref(`duty/${data.date}`)
      .set(dutyData)
      .then(update());
  };

  const findEmployees = () => {
    dataFirebase
      .ref(`user/`)
      .orderByChild('rank/position')
      .equalTo(20)
      .on('child_added', data => {
        dataFirebase
          .ref(`user/${data.key}/rank/department`)
          .on('value', datas => {
            datas.val() === 'designer' &&
              setArrayEmployees(prevState => [
                ...prevState,
                {
                  name: `${data.val().info.lastName} ${
                    data.val().info.firstName
                  }`
                }
              ]);
          });
      });
  };

  useEffect(findEmployees, []);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                select
                name="name"
                label="Employee"
                variant="outlined"
                SelectProps={{
                  native: true
                }}
                inputRef={register({ required: true })}
              >
                <option value="" hidden />
                {arrayEmployees.map((value, index) => (
                  <option key={index} value={`${value.name}`}>
                    {value.name}
                  </option>
                ))}
              </TextField>
              {errors.employee && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="date"
                required
                type="date"
                error={errors.date}
                variant="outlined"
                inputRef={register({ required: true })}
              />
              {errors.date && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button type="submit" color="primary" variant="contained">
            Add duty
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default FormAddDuty;
