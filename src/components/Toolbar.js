import React, { Component, PropTypes } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
// import AppStore from '../stores/AppStore';

export default class Toolbar extends Component {

  static contextTypes = {
    navigator: PropTypes.object,
  };

  static propTypes = {
    onIconPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '%Title', // AppStore.getState().routeName,
      theme: 'paperTeal', // AppStore.getState().theme,
      counter: 0,
    };
  }

  /* componentDidMount = () => {
    AppStore.listen(this.handleAppStore);
  }

  componentWillUnmount() {
    AppStore.unlisten(this.handleAppStore);
  }

  handleAppStore = (store) => {
    this.setState({
      title: store.routeName,
      theme: store.theme,
    });
  } */

  increment = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  }


  render() {
    const { navigator } = this.context;
    const { theme, counter } = this.state;
    const { onIconPress } = this.props;

    return (
      <MaterialToolbar
        title={this.props.title}
        primary={theme}
        icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
        onIconPress={() => (navigator && navigator.isChild ? navigator.back() : onIconPress())}
        actions={[{
          icon: 'warning',
          badge: { value: counter, animate: true },
          onPress: this.increment,
        }]}
        rightIconStyle={{
          margin: 10,
        }}
      />
    );
  }
}
