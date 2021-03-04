import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, datefire, userinfo, ...rest }) => {
  const classes = useStyles();
  const [massProject, setMassProject] = useState(null);

  const getAllProfile = () => {
    datefire.ref(`user/${userinfo}`).on('value', data => {
      setMassProject(prevState => ({
        ...prevState,
        ...data.val(),
        avatar: userinfo.photoURL
      }));
    });
  };

  useEffect(getAllProfile, []);

  if (massProject === null) {
    return <p>Lodding...</p>;
  } else {
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={userinfo.phoneURL} />
            <Typography color="textPrimary" gutterBottom variant="h3">
              {massProject.info &&
                `${massProject.info.firstName} ${massProject.info.lastName}`}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {massProject.info &&
                `${massProject.info.city} ${massProject.info.country}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Registration date{' '}
              {moment(massProject.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions>
      </Card>
    );
  }
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
