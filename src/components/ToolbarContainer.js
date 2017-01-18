import { connect } from 'react-redux';

import { openDrawer, navigateTo } from '../actions';
import { getBuilds, getBuildIssues } from '../modules/builds';
import { fetchBuilds } from '../services/MonitorService';
import Toolbar from './Toolbar';

const mapStateToProps = state => ({
  title: state.ui.route.title,
  issues: getBuildIssues(state),
  updating: getBuilds(state).isFetching,
  theme: state.ui.theme,
});

const mapDispatchToProps = dispatch => ({
  onLeftActionPress: () => dispatch(openDrawer()),
  // onIssuesPress: () => dispatch(fetchBuilds()),
  onIssuesPress: () => {
    console.log('onIssuesPress');
    dispatch(fetchBuilds());
    dispatch(navigateTo('services'));
  },
});


const ServicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

export default ServicesContainer;
