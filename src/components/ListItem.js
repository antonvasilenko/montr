import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
// eslint-disable-next-line
import { typography } from 'react-native-material-design-styles';
const TYPO = typography;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 16,
    height: 48,
    alignItems: 'center',
  },
  leftIcon: {
    width: 40,
    position: 'relative',
    top: 0,
  },
  rightIcon: {
    paddingLeft: 16,
    position: 'relative',
    top: -3,
    left: -8,
  },
  primaryText: Object.assign({}, TYPO.paperFontSubhead, { lineHeight: 24 }),
  secondaryText: Object.assign({}, TYPO.paperFontBody1, {
    lineHeight: 22,
    fontSize: 14,
    color: 'rgba(0,0,0,.54)',
  }),
  firstLine: {
    flexDirection: 'row',
  },
  primaryTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  captionTextContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  captionText: Object.assign({}, TYPO.paperFontCaption),
  captionTextContainer2: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default class List extends Component {

  static propTypes = {
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    captionText: PropTypes.string,
    secondaryTextMoreLine: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      style: PropTypes.object,
    })),
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
    lines: PropTypes.number,
    primaryColor: PropTypes.string,
    onPress: PropTypes.func,
    onLeftIconClick: PropTypes.func,
    onRightIconClick: PropTypes.func,
  };

  static defaultProps = {
    lines: 1,
    primaryColor: 'rgba(0,0,0,.87)',
  };

  /* eslint-disable */
  render() {
    const {
      primaryText,
      secondaryText,
      leftIcon,
      rightIcon,
      lines,
      onPress,
      primaryColor,
      onLeftIconClicked,
      onRightIconClicked,
      secondaryTextMoreLine,
      captionText
    } = this.props;

    const height = lines > 2 ? ((lines -1) * 16 + 56) : (secondaryText ? 72 : 48);
    return (
      <View
        ref={r => this.refRoot = r}
        style={[styles.listContainer, { height }]}
      >
        {leftIcon &&
          <TouchableWithoutFeedback onPress={onLeftIconClicked}>
            <View style={[styles.leftIcon, lines > 2 && { paddingTop: 16, alignSelf: 'flex-start' }]}>
              {leftIcon}
            </View>
          </TouchableWithoutFeedback>
        }
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.firstLine}>
            <View style={styles.primaryTextContainer}>
              <Text numberOfLines={1} style={[styles.primaryText,{ color: primaryColor }]}>
                {primaryText}
              </Text>
            </View>
            {(lines > 2 && !!rightIcon) ||
              <View style={styles.captionTextContainer}>
                <Text style={styles.captionText}>
                  {captionText}
                </Text>
              </View>
            }
          </View>
          {secondaryText &&
            <View>
              <Text style={[{ height:18 }, styles.secondaryText]}>
                {secondaryText}
              </Text>
            </View>
          }
          {secondaryTextMoreLine &&
            <View style={[{ height:18 }, lines > 2 && { height: 22 * (lines - 1) - 4 }]}>
              {secondaryTextMoreLine.map((line, idx) => (
                <Text key={idx} style={[styles.secondaryText, { height: 22 }, line.style]}>
                  {line.text}
                </Text>
              ))}
            </View>
          }
        </View>
        <View style={{ flexDirection: 'column' }}>
          {lines > 2 && !!rightIcon && !!captionText &&
            <View style={styles.captionTextContainer2}>
              <Text>{captionText}</Text>
            </View>}

          {rightIcon &&
            <Ripple onPress={onRightIconClicked}>
              <View
                style={[styles.rightIcon, { flex: 1 },lines > 2 && {
                  paddingTop: 16,
                  alignSelf: 'flex-end',
                  justifyContent:'flex-end'
                }]}
                onPress={onRightIconClicked}
              >
                {rightIcon}
              </View>
            </Ripple>
          }
        </View>
      </View>
    );
  }
}
/* eslint-enable */
