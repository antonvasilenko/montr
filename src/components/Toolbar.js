import React, { PropTypes } from 'react';
import {
  View,
} from 'react-native';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import test from '../test';

const isTest = true;

const getButtonIcon = (issues, updating) => {
  if (updating) return 'refresh';
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

const renderIssuesButton = (issues, updating, onIssuesPress) => {
  if (!issues) {
    return undefined;
  }
  return {
    icon: getButtonIcon(issues, updating),
    badge: {
      value: getButtonBadgeValue(issues),
      animate: false,
    },
    onPress: () => onIssuesPress(),
  };
};

const getActionButtons = (issues, updating, onIssuesPress) => {
  const actions = [];
  if (isTest) actions.push(testActions());
  const issuesBtn = renderIssuesButton(issues, updating, onIssuesPress);
  if (issuesBtn) actions.push(issuesBtn);
  return actions;
};

const styles = {
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const Toolbar = ({
  title,
  issues,
  theme,
  updating,
  onLeftActionPress,
  onIssuesPress,
}, { navigator }) =>
  <View style={[styles.toolbar]}>
    <MaterialToolbar
      title={title}
      primary={theme}
      icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
      onIconPress={() =>
        (navigator && navigator.isChild ? navigator.back() : onLeftActionPress())
      }
      actions={getActionButtons(issues, updating, onIssuesPress)}
      rightIconStyle={{ margin: 10 }}
    />
  </View>;

Toolbar.contextTypes = {
  navigator: PropTypes.object,
};

Toolbar.propTypes = {
  title: PropTypes.string,
  issues: PropTypes.object,
  theme: PropTypes.string,
  updating: PropTypes.bool,
  onLeftActionPress: PropTypes.func,
  onIssuesPress: PropTypes.func,
};

export default Toolbar;
