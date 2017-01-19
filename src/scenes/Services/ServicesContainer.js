import { connect } from 'react-redux';
import ServicesScene from './ServicesScene';
import { getBuildsGroups, getBuildsLoading } from '../../modules/builds';

const mapStateToProps = state => ({
  buildGroups: getBuildsGroups(state),
  isLoading: getBuildsLoading(state),
});

const ServicesContainer = connect(
  mapStateToProps,
  null,
)(ServicesScene);

export default ServicesContainer;
