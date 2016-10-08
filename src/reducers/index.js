import { combineReducers } from 'redux';
import groupBuilds from '../services/group-plans';

const initialState = {
  builds: {
    groups: {},
    isLoading: false,
  },
  issues: {
    errors: 0,
    warnings: 0,
  },
};

const builds = (state = initialState.builds, action) => {
  switch (action.type) {
    case 'FETCH_BUILDS_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_BUILDS_SUCCESS':
      return {
        ...state,
        groups: groupBuilds(action.list),
        isLoading: false,
      };
    case 'FETCH_BUILDS_ERROR':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const getCountOfIssuesOfType = type => state =>
  state.reduce((num, pl) => (num + pl.type === type ? 1 : 0), 0) || [];

const issues = (state = initialState.issues, action) => {
  console.log('issues reducer', action);
  switch (action.type) {
    case 'FETCH_BUILDS_SUCCESS':
      return {
        errors: getCountOfIssuesOfType('error')(action.list),
        warnings: getCountOfIssuesOfType('warning')(action.list),
      };
    case 'FETCH_BUILDS_ERROR':
      return {
        errors: 1,
        warnings: 0,
      };
    default:
      return state;
  }
};


export default combineReducers({
  builds,
  issues,
});
