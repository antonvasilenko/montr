import monitoringService from '../services/MonitorService';
import groupBuilds from '../services/group-plans';

import Navigate from '../services/Navigate';
import routes from '../routes';

import { updateThemeByIssues } from './theme';


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

export const getBuilds = () => async (dispatch, getState) => {
  const state = getState();
  if (state.builds.isFetching) return; // to avoid simultaneous http calls
  dispatch(actions.onFetchBuildsStarted());
  try {
    const buildsList = await monitoringService.getPlansData();
    const errors = monitoringService.getErrorsCount(buildsList);
    const warnings = monitoringService.getWarningsCount(buildsList);
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

