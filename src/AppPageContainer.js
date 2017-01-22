import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setNavigator } from './modules/route';
import drawerService from './services/DrawerService';
import { fetchBuilds } from './services/MonitorService';
import { loadTheme } from './modules/theme';
import AppPage from './AppPage';

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setNavigator,
    loadTheme,
    onTimerTicked: fetchBuilds,
  }, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  setDrawer: drawerService.setDrawer,
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

const AppPageContainer = connect(
  null,
  mapDispatchToProps,
  mergeProps,
)(AppPage);

export default AppPageContainer;
