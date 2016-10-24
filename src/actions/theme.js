import themeService from '../services/ThemeService';

const actions = {
  onUpdateTheme: name => ({
    type: 'UPDATE_THEME',
    name,
  }),
};

// example of checking the previous state in the action
export const updateTheme = name => (dispatch, getState) => {
  const state = getState();
  if (state.ui.theme !== name) { // TODO check here or put in the reducer ????
    themeService.updateTheme(name);
    dispatch(actions.onUpdateTheme(name));
  }
};

export const updateThemeByIssues = (errors, warnings) => {
  const name = themeService.getThemeForIssues(errors, warnings);
  return updateTheme(name);
};

export const loadTheme = () => async dispatch => {
  const theme = await themeService.loadTheme();
  dispatch(actions.onUpdateTheme(theme));
};
