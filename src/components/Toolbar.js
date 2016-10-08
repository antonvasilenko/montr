import React, { Component, PropTypes } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import AppStore from '../stores/AppStore';
import routes from '../routes';
import test from '../test';
import statusBarService from '../services/StatusBarService';

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
    statusBarService.setTheme(this.state.theme);
  }

  componentDidMount() {
    AppStore.listen(this.handleAppStore);
  }

  componentWillUnmount() {
    AppStore.unlisten(this.handleAppStore);
  }

  handleAppStore = (store) => {
    statusBarService.setTheme(store.theme);
    this.setState({
      title: store.routeName,
      theme: store.theme,
    });
  }

  test = true;

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

  testActions = () => ({
    icon: 'developer-mode',
    onPress: () => test(),
  });

  renderActions = () => {
    const actions = [];
    if (this.test) actions.push(this.testActions());
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
