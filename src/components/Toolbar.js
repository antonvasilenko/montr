import React, { PropTypes } from 'react';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import test from '../test';

const isTest = true;

const getButtonIcon = (issues) => {
  if (!issues) return undefined;
  if (issues.errors > 0) return 'highlight-off';
  if (issues.warnings > 0) return 'info-outline';
  return 'check-circle';
};

const getButtonBadgeValue = (issues) => {
  if (!issues) return 0;
  if (issues.errors > 0) return issues.errors;
  if (issues.warnings > 0) return issues.warnings;
  return 0;
};

const testActions = () => ({
  icon: 'developer-mode',
  onPress: () => test(),
});

const renderIssuesButton = (issues, onIssuesPress) => {
  if (!issues) {
    return undefined;
  }
  return {
    icon: getButtonIcon(issues),
    badge: {
      value: getButtonBadgeValue(issues),
      animate: false,
    },
    onPress: () => onIssuesPress(),
  };
};

const getActionButtons = (issues, onIssuesPress) => {
  const actions = [];
  if (isTest) actions.push(testActions());
  const issuesBtn = renderIssuesButton(issues, onIssuesPress);
  if (issuesBtn) actions.push(issuesBtn);
  console.log('asdasd', actions);
  return actions;
};

const Toolbar = ({
  title,
  issues,
  theme,
  onLeftActionPress,
  onIssuesPress,
}, { navigator }) =>
  <MaterialToolbar
    title={title}
    primary={theme}
    icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
    onIconPress={() =>
      (navigator && navigator.isChild ? navigator.back() : onLeftActionPress())
    }
    actions={getActionButtons(issues, onIssuesPress)}
    rightIconStyle={{ margin: 10 }}
  />;

Toolbar.contextTypes = {
  navigator: PropTypes.object,
};

Toolbar.propTypes = {
  title: PropTypes.string,
  issues: PropTypes.object,
  theme: PropTypes.string,
  // updating: PropTypes.bool,
  onLeftActionPress: PropTypes.func,
  onIssuesPress: PropTypes.func,
};

export default Toolbar;
