import { combineReducers } from 'redux';
import groupBuilds from '../services/group-plans';

const initialState = {
  builds: {
    groups: {},
    isFetching: false,
  },
  issues: {
    errors: 0,
    warnings: 0,
  },
  drawer: {
    opened: false,
  },
  route: {
    key: 'services',
    title: 'Services',
  },
};

const builds = (state = initialState.builds, action) => {
  switch (action.type) {
    case 'FETCH_BUILDS_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_BUILDS_SUCCESS':
      return {
        ...state,
        groups: groupBuilds(action.list),
        isFetching: false,
      };
    case 'FETCH_BUILDS_ERROR':
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const getCountOfIssuesOfType = type => list =>
  list.reduce((num, pl) => (num + (pl.icon === type ? 1 : 0)), 0) || 0;

const issues = (state = initialState.issues, action) => {
  switch (action.type) {
    case 'FETCH_BUILDS_SUCCESS': {
      return {
        errors: getCountOfIssuesOfType('error')(action.list),
        warnings: getCountOfIssuesOfType('warning')(action.list),
      };
    }
    case 'FETCH_BUILDS_ERROR':
      return {
        errors: 1,
        warnings: 0,
      };
    default:
      return state;
  }
};

const drawer = (state = initialState.drawer, action) => {
  switch (action.type) {
    case 'DRAWER_OPEN':
      return {
        ...state,
        opened: true,
      };
    case 'DRAWER_CLOSE':
      return {
        ...state,
        opened: false,
      };
    default: return state;
  }
};

const route = (state = initialState.route, action) => {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        ...state,
        key: action.route,
        title: action.title,
      };
    default: return state;
  }
};


export default combineReducers({
  builds,
  issues,
  drawer,
  route,
});
