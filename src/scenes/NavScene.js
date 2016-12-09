import React, { PropTypes } from 'react';
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

const NavScene = ({ route, sceneSelected }) =>
  <Drawer theme="light">
    <Drawer.Header image={<Image source={require('./../img/dev.jpg')} />}>
      <View style={styles.header}>
        <Avatar size={80} image={
          <Image source={require('./../img/ch24_mon.png')} />}
        />
        <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontHeadline]}>
          VEVE/VC Monitoring
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
          onPress: () => sceneSelected(r),
          onLongPress: () => sceneSelected(r),
        }))
      }
    />
  </Drawer>;

NavScene.propTypes = {
  sceneSelected: PropTypes.func,
  route: PropTypes.string,
};

export default NavScene;
