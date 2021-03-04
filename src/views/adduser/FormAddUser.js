import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  root: {}
}));

const FormAddUser = ({ className, datefire, userinfo, ...rest }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef();
  const [arrayRang, setArrayRang] = useState({
    department: [''],
    position: ['']
  });

  password.current = watch('password', '');
  const instalForm = () => {
    datefire.ref('rank').on('child_added', data => {
      setArrayRang(prevState => ({
        ...prevState,
        [data.key]: Object.values(data.val())
      }));
    });
  };

  useEffect(instalForm, []);

  const onSubmit = (data, e) => {
    const info = {
      birthday: data.birthday,
      createdAt: Date(),
      info: {
        avatar: '',
        city: data.city,
        country: data.country,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        telegram: data.telegram
      },
      rank: {
        department: data.department,
        position: data.position
      }
    };
    userinfo
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(result => {
        datefire.ref(`user/${result.user.uid}`).set(info);
        data.department === 'designer' &&
          datefire.ref(`designer/employees/${result.user.uid}`).set({
            position: data.position
          });
        e.target.reset();
      });
  };
  console.log(arrayRang);
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                required
                variant="outlined"
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                select
                name="department"
                label="Department"
                variant="outlined"
                SelectProps={{
                  native: true
                }}
                inputRef={register({ required: true })}
              >
                <option value="" hidden />
                {arrayRang.department.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </TextField>
              {errors.department && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                select
                name="position"
                label="Position"
                variant="outlined"
                SelectProps={{
                  native: true
                }}
                inputRef={register({ required: true })}
              >
                <option value="" hidden />
                {arrayRang.position.map((value, index) => (
                  <option key={index} value={value.degree}>
                    {value.name}
                  </option>
                ))}
              </TextField>
              {errors.position && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Birthday"
                name="birthday"
                required
                type="date"
                variant="outlined"
                inputRef={register}
              />
              {errors.lastName && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                required
                type="password"
                variant="outlined"
                inputRef={register({
                  required: 'You must specify a password',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters'
                  }
                })}
              />
              {errors.password && (
                <Box color="error.main">{errors.password.message}</Box>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirm password"
                name="confirm"
                required
                type="password"
                variant="outlined"
                inputRef={register({
                  validate: value =>
                    value === password.current || 'The passwords do not match'
                })}
              />
              {errors.confirm && (
                <Box color="error.main">{errors.confirm.message}</Box>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                required
                variant="outlined"
                inputRef={register({ required: true })}
              />
              {errors.firstName && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                required
                variant="outlined"
                inputRef={register({ required: true })}
              />
              {errors.lastName && (
                <Box color="error.main">This field is required</Box>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telegtam link"
                name="telegram"
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="number"
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                variant="outlined"
                inputRef={register}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button type="submit" color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

FormAddUser.propTypes = {
  className: PropTypes.string
};

export default FormAddUser;
