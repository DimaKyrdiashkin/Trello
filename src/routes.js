import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/knowledge/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import AddUser from './views/adduser/insdex';
import Report from 'src/views/report';
import Duty from 'src/views/duty';
import Calendar from 'src/views/calendar';
import MonthReport from 'src/views/monthReport';
const routes = [
  {
    path: '',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'adduser', element: <AddUser /> },
      { path: 'knowledge', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'report', element: <Report /> },
      { path: 'month_report', element: <MonthReport /> },
      { path: 'duty', element: <Duty /> },
      { path: 'calendar', element: <Calendar /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <LoginView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
