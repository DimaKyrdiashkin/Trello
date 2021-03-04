import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  TextField,
  Modal,
  Fade,
  Backdrop,
  makeStyles
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(theme => ({
  root: {},
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Toolbar = ({ className, catalog, dataCatalog, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newTitleKnow, setNewTitleKnow] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleOpen = () => {
    setOpen(prevState => !prevState);
  };

  const onSubmit = (data, e) => {
    const mass = Object.values(dataCatalog[data.department]);
    let flag = true;

    mass.map(value => {
      if (value.title === data.title) {
        flag = false;
        setNewTitleKnow(true);
      }
    });
    const dataInfo = {
      title: data.title,
      text: data.text,
      author: localStorage.getItem('userUid')
    };
    console.log(flag);
    data.link.length > 2 && (dataInfo.link = data.link);
    flag &&
      fire
        .database()
        .ref(`knowledge/${data.department}/${data.title}`)
        .update(dataInfo)
        .then(() => {
          e.target.reset();
        });
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add product
        </Button>
      </Box>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <TextField
                  error={errors.title && true}
                  fullWidth
                  label="Title"
                  name="title"
                  required
                  type="text"
                  variant="outlined"
                  inputRef={register({ required: true })}
                />
                {newTitleKnow && <p>title already exists</p>}
              </Box>
              <Box mt={3}>
                <TextField
                  error={errors.text && true}
                  fullWidth
                  label="text"
                  name="text"
                  type="text"
                  required
                  variant="outlined"
                  inputRef={register({ required: true })}
                />
              </Box>
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Link"
                  name="link"
                  type="text"
                  variant="outlined"
                  inputRef={register}
                />
              </Box>
              <Box mt={3}>
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
                  <option hidden />
                  {catalog.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </TextField>
              </Box>
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button type="submit" color="primary" variant="contained">
                  Save details
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
