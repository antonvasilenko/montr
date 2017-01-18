import { combineReducers } from 'redux';
import builds from './builds';

const initialState = {
  ui: {
    drawer: {
      ref: null,
    },
    route: {
      naviRef: null,
      key: 'services',
      title: 'Services',
    },
    theme: 'paperTeal',
  },
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
      if (state.key !== action.route) {
        state.naviRef.to(action.route);
        return {
          ...state,
          key: action.route,
          title: action.title,
        };
      }
      return state;
    }
    default: return state;
  }
};

const theme = (state = initialState.ui.theme, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      return action.name || state;
    default:
      return state;
  }
};


export default combineReducers({
  builds,
  ui: combineReducers({
    drawer,
    route,
    theme,
  }),
});
