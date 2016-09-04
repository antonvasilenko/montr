import StatusBarAndroid from 'react-native-android-statusbar';
import { COLOR } from 'react-native-material-design';
import alt from './alt';

class AppActions {

  updateTheme(name) {
    StatusBarAndroid.setHexColor(COLOR[`${name}500`].color);
    return name;
  }

  loadTheme() {}
}

export default alt.createActions(AppActions);
