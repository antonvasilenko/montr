import React, { PropTypes } from 'react';
import {
  Icon,
} from 'react-native-material-design';

import BuildPlanRow from './BuildPlanRow';


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

const mapBuildNumber = item => {
  if (item && item.lastBuild) {
    return item.lastBuild.toString();
  }
  return '';
};

const prtgStatus = (alive) => {
  if (alive === undefined) return 'unknown';
  return alive ? 'good' : 'error';
};

const mapSensorData = (deployment) => ({
  name: deployment.name,
  build: (deployment.build || '???').toString(),
  deployStatus: deployment.latest ? 'good' : 'warning',
  prtgStatus: prtgStatus(deployment.alive),
});

const getSensorsData = (data) => {
  if (data && data.deployments) {
    const res = data.deployments.map(mapSensorData);
    return res;
  }
  return [];
};

const BuildPlanRowComponent = ({ data }) =>
  <BuildPlanRow
    primaryText={data.name}
    leftIconText={mapBuildNumber(data)}
    leftIcon={renderIcon(data)}
    items={getSensorsData(data)}
  />;

BuildPlanRowComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BuildPlanRowComponent;
