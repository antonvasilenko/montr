import React, { Component, PropTypes } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import AppStore from '../stores/AppStore';
import routes from '../routes';

export default class Toolbar extends Component {

  static contextTypes = {
    navigator: PropTypes.object,
  };

  static propTypes = {
    onIconPress: PropTypes.func.isRequired,
    route: PropTypes.string.isRequired,
    issues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: AppStore.getState().routeName,
      theme: AppStore.getState().theme,
    };
  }

  componentDidMount() {
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
  }

  issuesAction = () => {
    if (!this.props.issues || this.props.issues.count === 0) {
      return undefined;
    }
    const icon = this.props.issues.type === 'error' ? 'error' : 'warning';
    return {
      icon,
      badge: { value: this.props.issues.count, anumate: true },
      onPress: this.context.navigator.to('services'),
    };
  }

  renderActions = () => {
    const actions = [];
    const issues = this.issuesAction();
    if (issues) actions.push(issues);
    return actions;
  }

  render() {
    const { navigator } = this.context;
    const { theme } = this.state;
    const { onIconPress, route } = this.props;

    const title = routes[route] ? routes[route].title : 'VEVE Montr';

    return (
      <MaterialToolbar
        title={title}
        primary={theme}
        icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
        onIconPress={() => (navigator && navigator.isChild ? navigator.back() : onIconPress())}
        actions={this.renderActions()}
        rightIconStyle={{
          margin: 10,
        }}
      />
    );
  }
}
