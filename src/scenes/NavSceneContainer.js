import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sceneSelected } from '../actions';
import NavScene from './NavScene';

const mapStateToProps = state => ({
  route: state.ui.route.key,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    sceneSelected,
  }, dispatch);


const NavSceneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavScene);

export default NavSceneContainer;
