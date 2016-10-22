import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  DrawerLayoutAndroid,
} from 'react-native';
import Toolbar from './components/ToolbarContainer';
import Navigate from './utils/Navigate';

import NavScene from './scenes/NavSceneContainer';
import AppActions from './stores/AppActions';

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
    closeDrawer: PropTypes.func,
  }

  componentDidMount() {
    AppActions.loadTheme();
  }

  setNavigator = (navi) => {
    this.props.setNavigator(navi);
  }

  setDrawer = drawer => {
    this.props.setDrawer(drawer);
  }

  renderHeader = (name) => (<Text>{name}</Text>);

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <NavScene />}
        ref={this.setDrawer}
      >
        <Navigator
          initialRoute={Navigate.getInitialRoute()}
          navigationBar={<Toolbar />}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          ref={this.setNavigator}
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

