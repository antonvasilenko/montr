import Navigate from '../services/Navigate';
import routes from '../routes';

const actions = {
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

