import { combineReducers } from 'redux';
import builds from './builds';
import route from './route';
import theme from './theme';

export default combineReducers({
  builds,
  ui: combineReducers({
    route,
    theme,
  }),
});

