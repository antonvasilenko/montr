import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBuilds, openDrawer, closeDrawer, setDrawer, setNavigator } from './actions';
import { loadTheme } from './actions/theme';
import AppPage from './AppPage';

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setNavigator,
    setDrawer,
    loadTheme,
    openDrawer,
    closeDrawer,
    onTimerTicked: getBuilds,
  }, dispatch);


const AppPageContainer = connect(
  null,
  mapDispatchToProps
)(AppPage);

export default AppPageContainer;