import { connect } from 'react-redux';
import ServicesScene from './ServicesScene';

const mapStateToProps = state => ({
  buildGroups: state.builds.groups,
  isLoading: state.builds.isFetching,
});

const ServicesContainer = connect(
  mapStateToProps,
  null,
)(ServicesScene);

export default ServicesContainer;
