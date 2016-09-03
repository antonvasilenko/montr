import React, { PropTypes } from 'react';
import {
  Icon,
} from 'react-native-material-design';
import ListItem from '../../components/ListItem';

const renderRowIcon = item => {
  const icon = {
    name: 'cloud',
    color: 'paperBlueGrey300',
  };
  if (item.enabled) {
    icon.name = 'cloud-done';
    icon.color = 'paperLightGreenA700';
  }
  return (<Icon
    name={icon.name}
    color={icon.color}
  />);
};

const renderRowSummary = item => {
  if (item.latestDeployment) {
    return `int: #${item.latestDeployment.integration.planResultNumber} ` +
      `prod: #${item.latestDeployment.production.planResultNumber}`;
  }
  if (item.latestResult) {
    return `build-#${item.latestResult.buildNumber}`;
  }
  return 'no details :(';
};

const Plan = ({ data }) =>
  <ListItem
    primaryText={data.name}
    secondaryText={renderRowSummary(data)}
    leftIcon={renderRowIcon(data)}
  />;

Plan.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Plan;
