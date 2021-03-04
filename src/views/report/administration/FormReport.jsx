import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import fire from 'firebase';
import { Card, CardContent, Grid, Button, TextField } from '@material-ui/core';

export const FormAdmin = ({ setForm }) => {
  const { register, handleSubmit, errors } = useForm();
  const [arrayDepartment, setArrayDepartment] = useState([]);

  const onSubmit = data => {
    setForm({
      date: data.date,
      department: data.department
    });
  };

  useEffect(() => {
    fire
      .database()
      .ref('rank/department')
      .on('child_added', data => {
        setArrayDepartment(prevState => [...prevState, data.val()]);
      });
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                error={errors.department && true}
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
                {arrayDepartment.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={2} xs={6}>
              <Button type="submit" color="primary" variant="contained">
                search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
