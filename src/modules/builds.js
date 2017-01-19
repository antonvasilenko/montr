const BUILDS_FETCH_START = 'BUILDS_FETCH_START';
const BUILDS_FETCH_SUCCESS = 'BUILDS_FETCH_SUCCESS';
const BUILDS_FETCH_ERROR = 'BUILDS_FETCH_ERROR';

const initialState = {
  groups: { 'no data': [] },
  list: null,
  errors: 0,
  warnings: 0,
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
        list: action.list,
        errors: action.errors,
        warnings: action.warnings,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default builds;

// ------ selectors -----------------
export const getBuildsLoading = state => state.builds.isFetching;
export const getBuildsGroups = state => state.builds.groups;

export const getBuildIssues = state => ({
  errors: state.builds.errors,
  warnings: state.builds.warnings,
});

// ------ action creators -----------
export const onFetchBuildsStarted = () => ({
  type: BUILDS_FETCH_START,
});
export const onFetchBuildsSucceeded = (list, groups, errors, warnings) => ({
  type: BUILDS_FETCH_SUCCESS,
  list,
  groups,
  errors,
  warnings,
});

export const onBuildsFetchFailed = () => ({
  type: BUILDS_FETCH_ERROR,
  list: null,
  groups: { 'error occured': [] },
  errors: 1,
  warnings: 0,
});
