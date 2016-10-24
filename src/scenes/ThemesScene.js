import React, { PropTypes } from 'react';
import { TouchableHighlight, View,
  Text, StyleSheet, ScrollView } from 'react-native';

import themeService from '../services/ThemeService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  item: {
    // width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
});

  // changeTheme = (theme) => {
  //   AppActions.updateTheme(theme);
  // }


const ThemeService = ({ updateTheme }) =>
  <ScrollView style={{ backgroundColor: '#fff' }}>
    {themeService.getThemes().map(th =>
      <TouchableHighlight
        key={th.color}
        onPress={() => updateTheme(th.color)}
      >
        <View style={[styles.item, { backgroundColor: th.background }]}>
          <Text style={styles.text}>{th.color}</Text>
        </View>
      </TouchableHighlight>
    )}
  </ScrollView>;

ThemeService.propTypes = {
  // theme: PropTypes.string,
  updateTheme: PropTypes.func,
};

export default ThemeService;
