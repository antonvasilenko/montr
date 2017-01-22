import { connect } from 'react-redux';

import { navigateTo, getRouteTitle } from '../modules/route';
import { getThemeName } from '../modules/theme';
import { openDrawer } from '../modules/drawer';
import { getBuildsLoading, getBuildIssues } from '../modules/builds';
import { fetchBuilds } from '../services/MonitorService';
import Toolbar from './Toolbar';

const mapStateToProps = state => ({
  issues: getBuildIssues(state),
  updating: getBuildsLoading(state),
  title: getRouteTitle(state),
  theme: getThemeName(state),
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
