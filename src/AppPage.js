import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  DrawerLayoutAndroid,
} from 'react-native';
import Toolbar from './components/ToolbarContainer';
import { getInitialRoute } from './services/Navigate';


import NavScene from './scenes/NavSceneContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scene: {
    flex: 1,
    marginTop: 56,
  },
});

class AppPage extends Component {

  static propTypes = {
    setNavigator: PropTypes.func,
    setDrawer: PropTypes.func,
    loadTheme: PropTypes.func,
    onTimerTicked: PropTypes.func,
  }

  componentDidMount() {
    this.props.loadTheme();
    this.props.onTimerTicked();
    // this.timer = setInterval(this.props.onTimerTicked, 15000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <NavScene />}
        ref={this.props.setDrawer}
      >
        <Navigator
          initialRoute={getInitialRoute()}
          navigationBar={<Toolbar />}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          ref={r => this.props.setNavigator(r)}
          renderScene={route =>
            <View
              style={styles.scene}
              showsVerticalScrollIndicator={false}
            >
              <route.component title={route.title} path={route.path} {...route.props} />
            </View>}
        />
      </DrawerLayoutAndroid>
    );
  }
}

export default AppPage;

