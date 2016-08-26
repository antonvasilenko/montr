import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const welcome = ({ name }) => 
  <Text style={styles.welcome}>
    Welcome to React Native, {name}!!!
  </Text>;

welcome.propTypes = {
  name: PropTypes.string.isRequired,
};

export default welcome;