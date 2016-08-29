import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image, View,
} from 'react-native';
import { Button, Card } from 'react-native-material-design';
import imageWelcome from './img/welcome.jpg';

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

  state = {
    page: 'material',
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

  renderDefault() {
    return (
      <View style={styles.container}>
        {this.renderHeader('Anton')}
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Button />
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }

  render() {
    switch (this.state.page) {
      case 'material':
        return this.renderMaterial();
      default:
        return this.renderDefault();
    }
  }
}

export default AppPage;

