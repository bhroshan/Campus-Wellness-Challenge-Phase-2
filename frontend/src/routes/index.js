import Home from '../pages/Home';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import CreateChallenge from '../pages/CreateChallenge';
import ViewChallengeList from '../pages/viewChallengeList';
import JoinedChallenge from '../pages/JoinedChallenge';
import ViewDetails from '../pages/viewDetails';
import { compose } from '@reduxjs/toolkit';
import EditChallenge from '../pages/EditChallenge';

// Public routes configuration
export const publicRoutes = [
  {
    path: '/',
    component: Home,
    title: 'Home',
  },
  {
    path: '/login',
    component: Login,
    title: 'Login',
  },
  {
    path: '/register',
    component: Register,
    title: 'Register',
  },
];

// Private routes configuration
export const privateRoutes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        title: 'Dashboard',
      },
      {
        path: 'create-challenge',
        component: CreateChallenge,
        title: 'Create Challenge',
      },
      {
        path: 'edit-challenge/:id',
        component: EditChallenge,
        title: 'Edit Challenge',
      },
      {
        path: 'view-challenge-list',
        component: ViewChallengeList,
        title: 'View Challenges',
      },
      {
        path: 'joined-challenge',
        component: JoinedChallenge,
        title: 'Joined Challenges',
      },
      {
        path: '/view-details/:id',
        component: ViewDetails,
        title: 'ViewDetails',
      },
    ],
  },
];
