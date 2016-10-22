import { connect } from 'react-redux';

import { openDrawer, navigateTo } from '../actions';
import Toolbar from './Toolbar';

const mapStateToProps = state => ({
  title: state.ui.route.title,
  issues: state.issues,
  updating: state.builds.isFetching,
  theme: state.ui.theme,
});

const mapDispatchToProps = dispatch => ({
  onLeftActionPress: () => dispatch(openDrawer()),
  onIssuesPress: () => dispatch(navigateTo('services')),
});


const ServicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

export default ServicesContainer;
