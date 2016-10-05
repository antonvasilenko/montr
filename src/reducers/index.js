import { combineReducers } from 'redux';

const initialState = {
  builds: {
    list: [],
    isLoading: false,
  },
  issues: {
    errors: 0,
    warnings: 0,
  },
};

const builds = (state = initialState.builds, action) => {
  switch (action.type) {
    case 'RECEIVE_BUILDS':
      return {
        list: action.buildsData,
        isLoading: false,
      };
    default:
      return state;
  }
};

const getCountOfIssuesOfType = type => state =>
  state.reduce((num, pl) => (num + pl.type === type ? 1 : 0), 0) || [];

const issues = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_BUILDS':
      return {
        errors: getCountOfIssuesOfType('error')(action.buildsData),
        warnings: getCountOfIssuesOfType('warning')(action.buildsData),
      };
    default:
      return state;
  }
};


export default combineReducers({
  builds,
  issues,
});
