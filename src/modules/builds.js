const BUILDS_FETCH_START = 'BUILDS_FETCH_START';
const BUILDS_FETCH_SUCCESS = 'BUILDS_FETCH_SUCCESS';
const BUILDS_FETCH_ERROR = 'BUILDS_FETCH_ERROR';

const initialState = {
  groups: { 'no data': [] },
  issues: {
    errors: 1,
    warnings: 0,
  },
  isFetching: false,
};

const builds = (state = initialState, action) => {
  switch (action.type) {
    case BUILDS_FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case BUILDS_FETCH_SUCCESS:
    case BUILDS_FETCH_ERROR:
      return {
        ...state,
        groups: action.groups,
        issues: action.issues,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default builds;

// ------ selectors -----------------
export const getBuilds = state => state.builds;
export const getBuildIssues = state => state.builds.issues;

// ------ action creators -----------
export const onFetchBuildsStarted = () => ({
  type: BUILDS_FETCH_START,
});
export const onFetchBuildsSucceeded = (groups, errors, warnings) => ({
  type: BUILDS_FETCH_SUCCESS,
  groups,
  issues: { errors, warnings }
});

export const onBuildsFetchFailed = error => ({
  type: BUILDS_FETCH_ERROR,
  groups: { 'error occured': [] },
  issues: {
    errors: 1,
    warnings: 0,
  },
  error,
});
