import React, { PropTypes } from 'react';
import {
  Icon,
} from 'react-native-material-design';
import ListItem from '../../components/ListItem';

const getIconData = item => {
  switch (item.icon) {
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
  const data = getIconData(item);
  return (<Icon name={data.name} color={data.color} />);
};

const renderSummary = item => {
  if (item.latestDeployment) {
    return `int-${item.latestDeployment.integration.planResultNumber} ` +
      `prod-${item.latestDeployment.production.planResultNumber}`;
  }
  if (item.latestResult) {
    return `build-${item.latestResult.buildNumber}`;
  }
  return '';
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
