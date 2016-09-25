import { AsyncStorage } from 'react-native';
import alt from '../alt';
import AppActions from '../actions/AppActions';
import groupBuilds from '../scenes/Services/group-plans.js';

const THEME = '@Storage:theme';

class AppStore {

  constructor() {
    this.theme = 'paperTeal';
    this.issues = { count: 0 };
    this.builds = { 'no data': [] };
    this.buildsFetching = false;
    this.buildsFetchError = null;
    this.loadTheme();

    this.bindListeners({
      handleUpdateTheme: AppActions.UPDATE_THEME,
      handleUpdateIssues: AppActions.UPDATE_ISSUES,

      handleFetchBuilds: AppActions.FETCH_BUILDS,
      handleUpdateBuilds: AppActions.UPDATE_BUILDS,
      handleFetchBuildsFailed: AppActions.FETCH_BUILDS_FAILED,
    });
  }

  loadTheme = () => {
    AsyncStorage.getItem(THEME).then((value) => {
      this.theme = value || 'paperTeal';
    });
  };

  handleUpdateTheme(name = 'paperTeal') {
    this.theme = name;
    AsyncStorage.setItem(THEME, name);
  }

  handleUpdateIssues(issues) {
    this.issues = issues;
  }

  handleFetchBuilds() {
    this.buildsFetching = true;
  }

  handleUpdateBuilds(builds = []) {
    this.buildsFetching = false;
    this.builds = groupBuilds(builds);
    this.errorMessage = null;
  }

  handleFetchBuildsFailed(errorMessage) {
    this.buildsFetching = false;
    this.buildsFetchError = errorMessage;
  }
}

export default alt.createStore(AppStore, 'AppStore');
