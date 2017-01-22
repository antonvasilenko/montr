import themeService from '../services/ThemeService';

const UPDATE_THEME = 'UPDATE_THEME';

const onUpdateTheme = name => ({
  type: UPDATE_THEME,
  name,
});

const initialState = {
  name: 'paperTeal',
};

const theme = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_THEME:
      return {
        name: action.name,
      };
    default:
      return state;
  }
};

export default theme;

// ------ selectors -----------------
export const getThemeName = state => state.ui.theme.name;

// ------ action creators -----------

// example of checking the previous state in the action
export const updateTheme = name => (dispatch, getState) => {
  const oldName = getThemeName(getState());
  if (oldName !== name) {
    themeService.updateTheme(name);
    dispatch(onUpdateTheme(name));
  }
};

export const updateThemeByIssues = (errors, warnings) =>
  updateTheme(themeService.getThemeForIssues(errors, warnings));

export const loadTheme = () => async dispatch => {
  const themeName = await themeService.loadTheme();
  dispatch(onUpdateTheme(themeName));
};

