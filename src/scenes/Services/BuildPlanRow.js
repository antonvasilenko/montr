import React, { PropTypes } from 'react';
import {
  Icon,
} from 'react-native-material-design';
import ListItem from '../../components/ListItem';

const getIcon = item => {
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
  const icon = getIcon(item);
  return (<Icon name={icon.name} color={icon.color} />);
};

const renderSummary = item => {
  const parts = [];
  if (item.latestResult) {
    parts.push(`build-${item.latestResult.buildNumber}`);
  }
  return parts.join(' ');
};

const renderDeploymentsData = item => {
  const parts = [];
  if (item.latestDeployment) {
    parts.push(`int-${item.latestDeployment.integration.planResultNumber}  `);
    parts.push(`prod-${item.latestDeployment.production.planResultNumber}  `);
    parts.push(`uptime-${item.latestDeployment.uptime.planResultNumber}`);
  }
  return parts.join(' ');
};

const renderDetails = item => ([
  renderDeploymentsData(item),
].map(text => ({ text })));

const Plan = ({ data }) =>
  <ListItem
    lines={2}
    primaryText={data.name}
    secondaryText={renderSummary(data)}
    secondaryTextMoreLine={renderDetails(data)}
    leftIcon={renderIcon(data)}
  />;

Plan.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Plan;
