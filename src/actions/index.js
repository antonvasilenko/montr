import monitoringService from '../services/MonitorService';
import groupBuilds from '../services/group-plans';

const actions = {
  onFetchBuildsStarted: () => ({
    type: 'FETCH_BUILDS_START',
  }),
  onFetchBuildsSucceeded: builds => ({
    type: 'FETCH_BUILDS_SUCCESS',
    list: builds,
  }),
  onBuildsFetchFailed: error => ({
    type: 'FETCH_BUILDS_ERROR',
    error,
  }),
};

export const getBuilds = () => async dispatch => {
  dispatch(actions.onFetchBuildsStarted());
  try {
    const builds = await monitoringService.getPlansData();
    const groupedBuilds = groupBuilds(builds);
    dispatch(actions.onFetchBuildsSucceeded(groupedBuilds));
  } catch (err) {
    dispatch(actions.onBuildsFetchFailed(err));
  }
};

export const updateTheme = name => (dispatch, getState) => {
  const currentThemeName = getState();
  if (currentThemeName !== name) { // TODO check here or put in the reducer ????
    return {
      type: 'UPDATE_THEME',
      name,
    };
  }
  return false;
};
