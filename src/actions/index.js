import monitoringService from '../services/MonitorService';
import groupBuilds from '../services/group-plans';

import Navigate from '../utils/Navigate';
import routes from '../routes';

import { updateThemeByIssues } from './theme';

const getCountOfIssuesOfType = type => list =>
  list.reduce((num, pl) => (num + (pl.icon === type ? 1 : 0)), 0) || 0;

const actions = {
  onFetchBuildsStarted: () => ({
    type: 'FETCH_BUILDS_START',
  }),
  onFetchBuildsSucceeded: (groups, errors, warnings) => ({
    type: 'FETCH_BUILDS_SUCCESS',
    groups,
    errors,
    warnings,
  }),
  onBuildsFetchFailed: error => ({
    type: 'FETCH_BUILDS_ERROR',
    error,
  }),
  onDrawerSet: (ref) => ({ type: 'DRAWER_SET', ref }),
  onDrawerOpen: () => ({ type: 'DRAWER_OPEN' }),
  onDrawerClose: () => ({ type: 'DRAWER_CLOSE' }),

  onNavigatorSet: (ref) => ({
    type: 'NAVIGATOR_SET',
    ref: new Navigate(ref),
  }),
  onNavigateTo: (route, title) => ({
    type: 'NAVIGATE',
    route,
    title,
  }),
};

export const getBuilds = () => async dispatch => {
  dispatch(actions.onFetchBuildsStarted());
  try {
    const buildsList = await monitoringService.getPlansData();
    const errors = getCountOfIssuesOfType('error')(buildsList);
    const warnings = getCountOfIssuesOfType('warning')(buildsList);
    const groups = groupBuilds(buildsList);
    dispatch(actions.onFetchBuildsSucceeded(groups, errors, warnings));
    dispatch(updateThemeByIssues(errors, warnings));
  } catch (err) {
    dispatch(actions.onBuildsFetchFailed(err));
  }
};

export const setDrawer = actions.onDrawerSet;
export const openDrawer = actions.onDrawerOpen;
export const closeDrawer = actions.onDrawerClose;


export const setNavigator = actions.onNavigatorSet;
// do we need that ?
export const navigateTo = (route) => {
  const title = routes[route] ? routes[route].title : 'VEVE Montr';
  return actions.onNavigateTo(route, title);
};

export const sceneSelected = name => dispatch => {
  dispatch(actions.onDrawerClose());
  dispatch(navigateTo(name));
};

