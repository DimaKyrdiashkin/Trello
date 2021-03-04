import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Link as RouterLink
import PropTypes from 'prop-types';
import fire from 'src/config/fire-conf';
import { Drawer, Hidden, makeStyles } from '@material-ui/core';
import { Content } from './Content';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const datafire = fire.database();
  const userFire = localStorage.getItem('userUid');
  const [massUserInfo, setMassUserInfo] = useState(null);

  const getUserInfo = () => {
    datafire.ref(`user/${userFire}`).on('value', data => {
      setMassUserInfo(data.val());
    });
  };
  useEffect(getUserInfo, []);

  const checkMobile = () => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  };

  useEffect(checkMobile, [location.pathname]);

  if (massUserInfo === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Content classes={classes} userInfo={massUserInfo} />
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          <Content classes={classes} userInfo={massUserInfo} />
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
