import React, { PropTypes } from 'react';
import {
  Icon,
} from 'react-native-material-design';
import ListItem from '../../components/ListItem';

const getIcon = item => {
  switch (item.type) {
    case 'good':
      return { name: 'cloud-done', color: 'googleGreen500' };
    case 'warning':
      return { name: 'cloud-done', color: 'googleYellow500' };
    case 'error':
      return { name: 'error', color: 'googleRed500' };
    default:
      return { name: 'cloud', color: 'paperBlueGrey300' };
  }
};

const renderIcon = item => {
  const icon = getIcon(item);
  return (<Icon name={icon.name} color={icon.color} />);
};

const renderSummary = item => {
  const parts = [];
  if (item.latestResult) {
    parts.push(`build - ${item.latestResult.buildNumber}`);
  }
  if (item.latestDeployment) {
    parts.push(`int - ${item.latestDeployment.integration.planResultNumber}`);
    parts.push(`prod - ${item.latestDeployment.production.planResultNumber}`);
  }
  return parts.join(' ');
};

const Plan = ({ data }) =>
  <ListItem
    primaryText={data.name}
    secondaryText={renderSummary(data)}
    leftIcon={renderIcon(data)}
  />;

Plan.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Plan;
