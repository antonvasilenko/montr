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
import AppActions from '../../actions/AppActions';

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
    this.buildsDs = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      servicesDs: this.buildsDs.cloneWithRowsAndSections({ 'no data': [] }),
      altState: AppStore.getState(),
    };
  }


  componentDidMount() {
    AppStore.listen(this.handleAppStore);
    AppActions.fetchBuilds();
    // this.loadData();
    // this.timer = setInterval(this.loadData, 5000);
  }

  componentWillUnmount() {
    AppStore.unlisten(this.handleAppStore);
    // if (this.timer) clearInterval(this.timer);
    // this.timer = null;
  }

  handleAppStore = (state) => {
    this.setState({ altState: state });
    // maybe handle theme changing somehow
  }

  /* loadData = async () => {
    try {
      const buildPlans = await MonitorService.getPlansData();
      if (!this.timer) return;
      this.setState({
        servicesDs: this.prepareDataSource(buildPlans),
      });
    } catch (err) {
      console.warn(err);
    }
  }*/

  /* prepareDataSource = (buildPlans) => {
    const groupedBuildPlans = groupBuildPlans(buildPlans);
    return this.buildsDs.cloneWithRowsAndSections(groupedBuildPlans);
  }*/

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
    const ds = this.buildsDs.cloneWithRowsAndSections(this.state.altState.builds);
    return (
      <ListView style={{ backgroundColor: '#fff' }}
        enableEmptySections
        dataSource={ds}
        // dataSource={this.state.servicesDs}
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
