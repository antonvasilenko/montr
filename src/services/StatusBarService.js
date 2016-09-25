
import StatusBarAndroid from 'react-native-android-statusbar';
import { COLOR } from 'react-native-material-design';

class StatusBarService {
  constructor() {
    this.themeName = '';
  }

  setTheme(themeName) {
    if (this.themeName !== themeName) {
      this.themeName = themeName;
      StatusBarAndroid.setHexColor(COLOR[`${this.themeName}500`].color);
    }
  }
}

export default new StatusBarService();
