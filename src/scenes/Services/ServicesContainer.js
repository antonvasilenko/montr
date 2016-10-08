import { connect } from 'react-redux';

import { getBuilds } from '../../actions';
import ServicesScene from './ServicesScene';

const mapStateToProps = state => ({
  buildGroups: state.builds.groups,
  isLoading: state.builds.isFetching,
});

const mapDispatchToProps = dispatch => ({
  onTimerTicked: () => dispatch(getBuilds()),
});


const ServicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesScene);

export default ServicesContainer;
