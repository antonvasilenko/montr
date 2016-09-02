import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import { Avatar, Drawer, COLOR, TYPO } from 'react-native-material-design';
import routes from '../routes';

const styles = {
  header: {
    paddingTop: 16,
  },
  text: {
    marginTop: 20,
  },
  divider: {
    marginTop: 8,
  },
};

export default class NavScene extends Component {

  static propTypes = {
    onSceneSelected: PropTypes.func.isRequired,
    route: PropTypes.string.isRequired,
  };

  changeScene = (name) => {
    this.props.onSceneSelected(name);
  };

  render() {
    const route = this.props.route;

    const changeSceneCb = sceneName => () => this.changeScene(sceneName);

    return (
      <Drawer theme="light">
        <Drawer.Header image={<Image source={require('./../img/dev.jpg')} />}>
          <View style={styles.header}>
            <Avatar size={80} image={
              <Image source={require('./../img/ch24_mon.png')} />
            } />
            <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontHeadline]}>
              VEVE Monitoring Hub
            </Text>
          </View>
        </Drawer.Header>

        <Drawer.Section
          items={Object
            .keys(routes)
            .map(r => ({
              icon: routes[r].icon,
              value: routes[r].title,
              active: !route || route === r,
              onPress: changeSceneCb(r),
              onLongPress: changeSceneCb(r),
            }))
          }
        />
      </Drawer>
    );
  }
}
