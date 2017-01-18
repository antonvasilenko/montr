import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openDrawer, closeDrawer, setDrawer, setNavigator } from './actions';
import { fetchBuilds } from './services/MonitorService';
import { loadTheme } from './actions/theme';
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
