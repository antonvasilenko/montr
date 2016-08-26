import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Welcome from '../components/Welcome.js';

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
});

class AppPage extends Component {

  getContainerStyle = (name) => <Welcome name={name + '123'}/>;

  render() {
    return (
      <View style={styles.container}>
        {this.getContainerStyle('Anton')}
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

export default AppPage;

