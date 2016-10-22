import { AsyncStorage } from 'react-native';
import { COLOR, PRIMARY_COLORS } from 'react-native-material-design';
import statusBarService from './StatusBarService';

const THEME = '@Storage:theme';

const loadTheme = async () => {
  const name = await AsyncStorage.getItem(THEME);
  statusBarService.setTheme(name);
  return name;
};

const getThemes = () =>
  PRIMARY_COLORS.map(color => ({
    color,
    background: COLOR[`${color}500`].color,
  }));

const updateTheme = (name) => {
  statusBarService.setTheme(name);
  AsyncStorage.setItem(THEME, name);
};

const getThemeForIssues = (errors, warnings) => {
  if (errors && errors > 0) {
    return 'googleRed';
  }
  if (warnings && warnings > 0) {
    return 'googleYellow';
  }
  return 'googleGreen';
};

export default {
  loadTheme,
  updateTheme,
  getThemes,
  getThemeForIssues,
};
