import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openDrawer, closeDrawer, setDrawer } from './actions';
import AppPage from './AppPage';

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setDrawer,
    openDrawer,
    closeDrawer,
  }, dispatch);


const AppPageContainer = connect(
  null,
  mapDispatchToProps
)(AppPage);

export default AppPageContainer;
