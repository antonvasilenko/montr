const FETCH_BUILDS_START = 'BUILDS//FETCH_BUILDS_START';
const FETCH_BUILDS_SUCCESS = 'BUILDS//FETCH_BUILDS_SUCCESS';
const FETCH_BUILDS_ERROR = 'BUILDS//FETCH_BUILDS_ERROR';

const initialState = {
  groups: { 'no data': [] },
  isFetching: false,
};

const builds = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUILDS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_BUILDS_SUCCESS:
      return {
        ...state,
        groups: action.groups,
        isFetching: false,
      };
    case FETCH_BUILDS_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default builds;

// ------ selectors -----------------
export const getBuilds = state => state.builds;

// ------ action creators -----------
export const onFetchBuildsStarted = () => ({
  type: FETCH_BUILDS_START,
});
export const onFetchBuildsSucceeded = (groups, errors, warnings) => ({
  type: FETCH_BUILDS_SUCCESS,
  groups,
  errors,
  warnings,
});

export const onBuildsFetchFailed = error => ({
  type: FETCH_BUILDS_ERROR,
  error,
});
