import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openDrawer, closeDrawer, setDrawer, setNavigator } from './actions';
import AppPage from './AppPage';

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setNavigator,
    setDrawer,
    openDrawer,
    closeDrawer,
  }, dispatch);


const AppPageContainer = connect(
  null,
  mapDispatchToProps
)(AppPage);

export default AppPageContainer;
