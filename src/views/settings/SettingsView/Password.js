import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles({
  root: {}
});

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleClick = () => {
    setState({ open: true, ...{ vertical: 'top', horizontal: 'right' } });
  };
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const user = fire.auth().currentUser;
  const onSubmit = data => {
    user.updatePassword(data.password).then(() => {
      handleClick();
    });
  };

  return (
    <>
      <form
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
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
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="confirm"
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
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button color="primary" variant="contained" type="sumbit">
              Update
            </Button>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="Password update"
              key={vertical + horizontal}
            />
          </Box>
        </Card>
      </form>
    </>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
