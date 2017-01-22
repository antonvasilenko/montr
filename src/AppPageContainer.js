import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setNavigator } from './modules/route';
import { setDrawer, openDrawer, closeDrawer } from './modules/drawer';
import { fetchBuilds } from './services/MonitorService';
import { loadTheme } from './modules/theme';
import AppPage from './AppPage';

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setNavigator,
    setDrawer,
    loadTheme,
    openDrawer,
    closeDrawer,
    onTimerTicked: fetchBuilds,
  }, dispatch);


const AppPageContainer = connect(
  null,
  mapDispatchToProps
)(AppPage);

export default AppPageContainer;
