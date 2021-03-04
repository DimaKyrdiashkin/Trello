import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Divider, List, Typography } from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Trello as TrelloIcon,
  Tag as TegIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon
} from 'react-feather';
import NavItem from './NavItem';
import position from 'src/config/position';

const items = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/knowledge',
    icon: ShoppingBagIcon,
    title: 'Knowledge base'
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/report',
    icon: TrelloIcon,
    title: 'Report day'
  },
  {
    href: '/month_report',
    icon: ClockIcon,
    title: 'Month report'
  },
  {
    href: '/duty',
    icon: TegIcon,
    title: 'Duty'
  },
  {
    href: '/calendar',
    icon: CalendarIcon,
    title: 'Calendar'
  }
];

export const Content = ({ classes, userInfo }) => {
  const [positionRank, setPositionRank] = useState(null);

  const setMenuPosition = () => {
    position.map(value => {
      value.id === userInfo.rank.position && setPositionRank(value.name);
    });
  };

  useEffect(setMenuPosition, []);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={Link}
          src={userInfo.info && userInfo.info.avatar}
          to="/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {userInfo.info &&
            `${userInfo.info.firstName} ${userInfo.info.lastName}`}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {userInfo.rank && `${userInfo.rank.department} / ${positionRank}`}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {userInfo.rank.position >= 40 && (
            <NavItem href="/adduser" icon={UserPlusIcon} title="Add user" />
          )}
        </List>
      </Box>
    </Box>
  );
};
