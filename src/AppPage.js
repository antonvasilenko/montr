import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  DrawerLayoutAndroid,
} from 'react-native';
import Toolbar from './components/Toolbar';

import Navigate from './utils/Navigate';
import NavScene from './scenes/NavScene';
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

  state = {
    route: 'services',
  }

  componentDidMount() {
    AppActions.loadTheme();
  }

  onSceneSelected = (name) => {
    this.setState({ route: name }, () => {
      this.drawer.closeDrawer();
      this.navigator.to(name);
    });
  }

  setNavigator = (navi) => {
    this.navigator = new Navigate(navi);
  }

  setDrawer = drawer => {
    this.drawer = drawer;
  }

  renderHeader = (name) => (<Text>{name}</Text>);

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() =>
          <NavScene
            onSceneSelected={this.onSceneSelected}
            route={this.state.route}
          />
        }
        ref={this.setDrawer}
      >
        <Navigator
          initialRoute={Navigate.getInitialRoute()}
          navigationBar={<Toolbar
            route={this.state.route}
            onIconPress={() => this.drawer.openDrawer()}
          />}
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

