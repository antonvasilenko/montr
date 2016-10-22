import React, { Component, PropTypes } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import test from '../test';

export default class Toolbar extends Component {

  static contextTypes = {
    navigator: PropTypes.object,
  };

  static propTypes = {
    title: PropTypes.string,
    issues: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired,
    updating: PropTypes.bool,
    onLeftActionPress: PropTypes.func.isRequired,
    onIssuesPress: PropTypes.func.isRequired,
  };

  getButtonIcon = (issues) => {
    if (!issues) return undefined;
    if (issues.errors > 0) return 'highlight-off';
    if (issues.warnings > 0) return 'info-outline';
    return 'check-circle';
  }

  getButtonBadgeValue = (issues) => {
    if (!issues) return 0;
    if (issues.errors > 0) return issues.errors;
    if (issues.warnings > 0) return issues.warnings;
    return 0;
  }

  testActions = () => ({
    icon: 'developer-mode',
    onPress: () => test(),
  });

  test = true;

  renderIssuesButton = ({ issues, onIssuesPress }) => {
    if (!issues) {
      return undefined;
    }
    return {
      icon: this.getButtonIcon(issues),
      badge: {
        value: this.getButtonBadgeValue(issues),
        animate: false,
      },
      onPress: () => onIssuesPress(),
    };
  }

  renderActions = () => {
    const actions = [];
    if (this.test) actions.push(this.testActions());
    const issuesBtn = this.renderIssuesButton(this.props);
    if (issuesBtn) actions.push(issuesBtn);
    return actions;
  }

  render() {
    const { navigator } = this.context;
    const { onLeftActionPress, title, theme } = this.props;

    return (
      <MaterialToolbar
        title={title}
        primary={theme}
        icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
        onIconPress={() =>
          (navigator && navigator.isChild ? navigator.back() : onLeftActionPress())
        }
        actions={this.renderActions()}
        rightIconStyle={{
          margin: 10,
        }}
      />
    );
  }
}
