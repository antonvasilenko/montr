import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sceneSelected, getRouteKey } from '../modules/route';
import NavScene from './NavScene';

const mapStateToProps = state => ({
  route: getRouteKey(state),
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
