import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateTheme, getThemeName } from '../modules/theme';
import ThemesScene from './ThemesScene';

const mapStateToProps = state => ({
  theme: getThemeName(state),
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
