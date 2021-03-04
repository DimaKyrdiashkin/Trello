import React from 'react';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import fire from 'src/config/fire-conf';
import moment from 'moment';

const AddEventToCalendar = ({ addEvent }) => {
  const { register, handleSubmit } = useForm();

  const uppdateNewEvent = (form, e) => {
    fire
      .database()
      .ref(`calendar/${form.start + ' ' + form.title}`)
      .update({
        start: form.start,
        end: moment(form.end)
          .add(1, 'days')
          .format('YYYY-MM-DD'),
        title: form.title,
        description: form.event
      });
    addEvent();
    e.target.reset();
  };

  return (
    <Box mt={3}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(uppdateNewEvent)}
      >
        <Grid container spacing={3} mt={3}>
          <Grid item md={3} xs={12}>
            <TextField
              id="date"
              fullWidth
              name="start"
              required
              type="date"
              variant="outlined"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <TextField
              id="date"
              fullWidth
              name="end"
              type="date"
              variant="outlined"
              placeholder="Event title"
              inputRef={register({ required: false })}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="title"
              fullWidth
              name="title"
              required
              label="Event title"
              type="text"
              variant="outlined"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="event"
              label="Event description"
              name="event"
              required
              type="text"
              variant="outlined"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button type="submit" color="primary" variant="contained">
              Add event
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEventToCalendar;
