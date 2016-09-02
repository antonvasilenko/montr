import React, { Component } from 'react';
import { TouchableHighlight, View,
  Text, StyleSheet, ListView, ScrollView } from 'react-native';
import { COLOR, PRIMARY_COLORS } from 'react-native-material-design';

import AppActions from '../stores/AppActions';

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

export default class ThemesScene extends Component {

  changeTheme = (theme) => {
    AppActions.updateTheme(theme);
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        {PRIMARY_COLORS.map(color =>
          <TouchableHighlight key={color} onPress={() => { this.changeTheme(color); }}>
            <View style={[styles.item, { backgroundColor: COLOR[`${color}500`].color }]}>
              <Text style={styles.text}>{color}</Text>
            </View>
          </TouchableHighlight>
        )}
      </ScrollView>
    );
  }
}
