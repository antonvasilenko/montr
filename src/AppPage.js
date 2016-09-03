import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  DrawerLayoutAndroid,
} from 'react-native';
import { Button, Card } from 'react-native-material-design';
import Toolbar from './components/Toolbar';
import imageWelcome from './img/welcome.jpg';

import Navigate from './utils/Navigate';
import NavScene from './scenes/NavScene';

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
    page: 'drawer',
    route: 'services',
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

  renderMaterial() {
    return (
      <View>
        <Card>
          <Card.Media
            image={<Image source={imageWelcome} />}
            overlay
          />
          <Card.Body>
            <Text>Some text to go in the body.</Text>
          </Card.Body>
          <Card.Actions position="right">
            <Button value="ACTION" text="Click" />
          </Card.Actions>
        </Card>
      </View>
    );
  }

  renderDrawer() {
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

  render() {
    switch (this.state.page) {
      case 'material':
        return this.renderMaterial();
      case 'drawer':
        return this.renderDrawer();
      default:
        return (<Text>default</Text>);
    }
  }
}

export default AppPage;

