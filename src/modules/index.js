import { combineReducers } from 'redux';
import builds from './builds';
import drawer from './drawer';
import route from './route';

const UPDATE_THEME = 'UPDATE_THEME';

const initialState = {
  ui: {
    theme: 'paperTeal',
  },
};

const theme = (state = initialState.ui.theme, action) => {
  switch (action.type) {
    case UPDATE_THEME:
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

