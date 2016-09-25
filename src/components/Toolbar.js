import React, { Component, PropTypes } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import statusBarService from '../services/StatusBarService';
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

  state = AppStore.getState();

  componentDidMount() {
    AppStore.listen(this.handleStoreChange);
    statusBarService.setTheme(AppStore.getState().theme);
  }

  componentWillUnmount() {
    AppStore.unlisten(this.handleStoreChange);
  }

  handleStoreChange = (state) => {
    // TODO replace with this.updateState();
    statusBarService.setTheme(state.theme);
    this.setState(state);
  }

  fetchIssuesData = (issues) => {
    if (!issues || issues.count === 0) {
      return undefined;
    }
    const icon = issues.type === 'error' ? 'error' : 'warning';
    return {
      icon,
      badge: { value: issues.count, animate: true },
      onPress: () => this.context.navigator.to('services'),
    };
  }

  renderActions = (issues) => {
    const actions = [];
    const issuesData = this.fetchIssuesData(issues);
    if (issuesData) actions.push(issuesData);
    return actions;
  }

  render() {
    const { navigator } = this.context;
    const { theme, issues } = this.state;
    const { onIconPress, route } = this.props;

    const title = routes[route] ? routes[route].title : 'VEVE Montr';

    return (
      <MaterialToolbar
        title={title}
        primary={theme}
        icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
        onIconPress={() => (navigator && navigator.isChild ? navigator.back() : onIconPress())}
        actions={this.renderActions(issues)}
        rightIconStyle={{
          margin: 10,
        }}
      />
    );
  }
}
