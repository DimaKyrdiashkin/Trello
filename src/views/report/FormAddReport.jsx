import React from 'react';
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

const FormAddReport = ({ className, setArray, ...rest }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
    fire
      .database()
      .ref(
        `report_day/${localStorage.getItem('userUid')}/${
          data.date
        }/${+data.number - 1}`
      )
      .set({
        text: data.text,
        time: data.time
      })
      .then(() => {
        e.target.reset();
        setArray([]);
      });
  };
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
            <Grid item md={3} xs={12}>
              <TextField
                error={errors.date && true}
                fullWidth
                name="date"
                required
                type="date"
                variant="outlined"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item md={2} xs={6}>
              <TextField
                error={errors.time && true}
                fullWidth
                label="Time"
                name="time"
                required
                type="number"
                variant="outlined"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item md={2} xs={6}>
              <TextField
                error={errors.number && true}
                fullWidth
                label="Number report"
                name="number"
                required
                type="number"
                variant="outlined"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item md={5} xs={12}>
              <TextField
                error={errors.text && true}
                fullWidth
                label="Text"
                name="text"
                required
                variant="outlined"
                inputRef={register({ required: true })}
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

export default FormAddReport;
