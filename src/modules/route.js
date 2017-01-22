import Navigate from '../services/Navigate';
import routes from '../routes';
import { closeDrawer } from './drawer';

const NAVIGATOR_SET = 'NAVIGATOR_SET';
const NAVIGATE = 'NAVIGATE';

const initialState = {
  naviRef: null,
  key: 'services',
  title: 'Services',
};

const route = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATOR_SET:
      return {
        ...state,
        naviRef: action.ref,
      };
    case NAVIGATE: {
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

export default route;

// ------ selectors -----------------
const getRoute = state => state.ui.route;
export const getRouteKey = state => getRoute(state).key;
export const getRouteTitle = state => getRoute(state).title;

// ------ action creators -----------
export const setNavigator = (ref) => ({
  type: NAVIGATOR_SET,
  ref: new Navigate(ref),
});

// do we need that ?
export const navigateTo = (routeName) => ({
  type: NAVIGATE,
  route: routeName,
  title: routes[routeName] ? routes[routeName].title : 'VEVE Montr',
});

export const sceneSelected = name => dispatch => {
  dispatch(closeDrawer());
  dispatch(navigateTo(name));
};
