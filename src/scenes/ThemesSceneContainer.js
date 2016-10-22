import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateTheme } from '../actions/theme';
import ThemesScene from './ThemesScene';

const mapStateToProps = state => ({
  theme: state.ui.theme,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateTheme,
  }, dispatch);


const ThemeSceneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemesScene);

export default ThemeSceneContainer;
