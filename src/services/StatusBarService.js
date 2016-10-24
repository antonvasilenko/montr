import StatusBarAndroid from 'react-native-android-statusbar';
import { COLOR } from 'react-native-material-design';

class StatusBarService {

  setTheme(themeName) {
    if (themeName && this.themeName !== themeName) {
      this.themeName = themeName;
      StatusBarAndroid.setHexColor(COLOR[`${themeName}500`].color);
    }
  }
}

export default new StatusBarService();
