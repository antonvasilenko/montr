import React, { Component } from 'react';
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

import BuildPlanRow from './BuildPlanRow';
import MonitorService from '../../services/MonitorService';
import groupBuildPlans from './group-plans';
import AppStore from '../../stores/AppStore';

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLOR.paperBlueGrey50.color,
  },
  section: {
    padding: 16,
    backgroundColor: COLOR.paperBlueGrey50.color,
  },
  text: TYPO.paperFontBody1,
});

class ServicesScene extends Component {

  constructor(props) {
    super(props);
    const servicesDs = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      servicesDs: servicesDs.cloneWithRowsAndSections({ 'no data': [] }),
    };
  }


  componentDidMount() {
    AppStore.listen(this.handleAppStore);
    this.loadData();
    this.timer = setInterval(this.loadData, 5000);
  }

  componentWillUnmount() {
    AppStore.unlisten(this.handleAppStore);
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  handleAppStore = (/* store */) => {
    // maybe handle theme changing somehow
  }

  loadData = async () => {
    try {
      const buildPlans = await MonitorService.getPlansData();
      if (!this.timer) return;
      const groupedBuildPlans = groupBuildPlans(buildPlans);
      this.setState({
        servicesDs: this.state.servicesDs.cloneWithRowsAndSections(groupedBuildPlans),
      });
    } catch (err) {
      console.warn(err);
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
        dataSource={this.state.servicesDs}
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
