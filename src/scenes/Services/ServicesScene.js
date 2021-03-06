import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  // TouchableHighlight,
  // TouchableWithoutFeedback,
} from 'react-native';
import {
  COLOR, TYPO,
} from 'react-native-material-design';

import BuildPlanRow from './BuildPlanRowComponent';

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLOR.paperBlueGrey50.color,
  },
  section: {
    padding: 16,
    backgroundColor: COLOR.paperBlueGrey50.color,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  text: TYPO.paperFontBody1,
});

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

class ServicesScene extends Component {

  static propTypes = {
    buildGroups: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      buildsDs: ds.cloneWithRowsAndSections(props.buildGroups),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.buildGroups !== nextProps.buildGroups) {
      this.setState({
        buildsDs: ds.cloneWithRowsAndSections(nextProps.buildGroups),
      });
    }
  }

  renderSectionHeader(text) {
    return (
      <View style={styles.section}>
        <Text
          style={[styles.text, {
            fontWeight: '600',
            fontSize: 18,
          }]}
        >
          {text}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ListView style={{ backgroundColor: '#fff' }}
        enableEmptySections
        dataSource={this.state.buildsDs}
        renderRow={rowData =>
          <BuildPlanRow data={rowData} />}
        renderSeparator={(secId, rowId) =>
          <View key={`${secId}-${rowId}`} style={styles.divider} />}
        renderSectionHeader={(secData, category) =>
          this.renderSectionHeader(category)}
      />
    );
  }
}

export default ServicesScene;
