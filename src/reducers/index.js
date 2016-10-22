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
  ui: {
    drawer: {
      ref: null,
    },
    route: {
      naviRef: null,
      key: 'services',
      title: 'Services',
    },
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

// how to transfer command, initiated by toolbar drawer icon click event,
// from toolbar to drawer
// usual approach is to change state i.e. drawer.opened = true
// but drawer inside manages his own state, and there are a lot of ways to change it
// by the back of reducer. That means it's no longer a source of truth and
// we cannot be sure, whether the drawer opened or not.

// Finally, the solution was to store a reference to the drawer
// inside the global redux state with DRAWER_SET action
// Then, on DRAWER_OPEN and DRAWER_CLOSE actions, reducer was just calling
// drawer.ref.drawerOpen() or drawer.ref.drawerClose() methods.
// In this way redicer remained the single source of truth by
// implicitly holding and manipulating the drawer opened state inside drawer object.

const drawer = (state = initialState.ui.drawer, action) => {
  switch (action.type) {
    case 'DRAWER_SET':
      return {
        ...state,
        ref: action.ref,
      };
    case 'DRAWER_OPEN': {
      if (state.ref) state.ref.openDrawer();
      return state;
    }
    case 'DRAWER_CLOSE': {
      if (state.ref) state.ref.closeDrawer();
      return state;
    }
    default: return state;
  }
};


const route = (state = initialState.ui.route, action) => {
  switch (action.type) {
    case 'NAVIGATOR_SET':
      return {
        ...state,
        naviRef: action.ref,
      };
    case 'NAVIGATE': {
      state.naviRef.to(action.route);
      return {
        ...state,
        key: action.route,
        title: action.title,
      };
    }
    default: return state;
  }
};


export default combineReducers({
  builds,
  issues,
  ui: combineReducers({
    drawer,
    route,
  }),
});
