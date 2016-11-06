import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import RowSensor from './RowSensor';

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 8,
    paddingTop: 0,
    alignItems: 'flex-start',
  },
  leftContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    marginRight: 8,
    alignItems: 'center',
    width: 50,
    top: 0,
  },
  leftIconText: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'cyan',
    borderWidth: 1,
    borderColor: 'black',
  },
  rightContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: 'magenta',
  },
  primaryTextContainer: {
    flex: 1,
    paddingRight: 4,
  },
  primaryText: {
    color: 'rgba(0,0,0,.87)',
    fontSize: 20,
    fontWeight: '400',
  },
  contentContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  contentItem: {
    marginHorizontal: 1,
  },
  noContent: {
    flex: 2,
    justifyContent: 'center',
  },
});

export default class List extends Component {

  static propTypes = {
    primaryText: PropTypes.string,
    leftIcon: PropTypes.element,
    leftIconText: PropTypes.string,
    onPress: PropTypes.func,
    onLeftIconClicked: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      build: PropTypes.any,
      deployStatus: PropTypes.string,
      prtgStatus: PropTypes.string,
    })),
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const {
      primaryText,
      leftIcon,
      leftIconText,
      onLeftIconClicked,
      items,
    } = this.props;

    const hasSensors = items && items.length > 0;

    return (
      <View
        style={[styles.listContainer, { height: hasSensors ? 72 : 72 }]}
      >
        <TouchableWithoutFeedback onPress={onLeftIconClicked}>
          <View style={styles.leftContainer}>
            <View>{leftIcon}</View>
            <Text style={styles.leftIconText}>{leftIconText}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>{primaryText}</Text>
          </View>
          {hasSensors ?
            <View style={styles.contentContainer}>
              {items.map((child, idx) =>
                <View key={idx} style={styles.contentItem}>
                  <RowSensor key={idx} {...child} />
                </View>
              )}
            </View>
            :
            <View style={styles.noContent}>
              <Text>no deployment info</Text>
            </View>
          }
        </View>
      </View>
    );
  }
}
