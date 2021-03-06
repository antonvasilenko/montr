import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  Icon, COLOR,
} from 'react-native-material-design';

const styles = StyleSheet.create({
  rowSensor: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 1,
    paddingHorizontal: 2,
    marginRight: 2,

    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  buildContainer: {
    flexDirection: 'row',
    paddingVertical: 3,
    marginHorizontal: 3,
  },
  build: {
    fontWeight: '500',
    fontSize: 14,
  },
});

const color = name => COLOR[name].color;

const mapStatusToColorName = (status) => {
  switch (status) {
    case 'good':
      return 'googleGreen500';
    case 'warning':
      return 'googleYellow500';
    case 'error':
      return 'googleRed500';
    default:
      return 'paperBlueGrey300';
  }
};

const mapStatusToColor = status => color(mapStatusToColorName(status));

const mapSensorIcon = status => ({
  name: 'network-check',
  color: mapStatusToColorName(status),
});

const RowSensor = ({ name, build, deployStatus, prtgStatus }) =>
  <View style={[styles.rowSensor, { borderColor: mapStatusToColor(deployStatus) }]}>
    <View style={[styles.buildContainer]}>
      <Text>{name}:</Text>
      <Text style={[styles.build]}>{build}</Text>
    </View>
    <Icon size={20} {...mapSensorIcon(prtgStatus)} />
  </View>;

RowSensor.propTypes = {
  name: PropTypes.string.isRequired,
  build: PropTypes.string,
  deployStatus: PropTypes.string,
  prtgStatus: PropTypes.string,
};

export default RowSensor;
