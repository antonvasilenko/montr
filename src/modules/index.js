import { combineReducers } from 'redux';
import builds from './builds';
import drawer from './drawer';
import route from './route';
import theme from './theme';

export default combineReducers({
  builds,
  ui: combineReducers({
    drawer,
    route,
    theme,
  }),
});

