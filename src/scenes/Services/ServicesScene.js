import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Subheader, COLOR,
} from 'react-native-material-design';

import Plan from './Plan';
import MonitorService from '../../services/MonitorService';

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLOR.paperBlueGrey50.color,
  },
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
    this.loadData();
    this.timer = setInterval(this.loadData, 5000);
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  loadData = async () => {
    try {
      const planMap = await MonitorService.getGroupedPlans();
      if (!this.timer) return;
      this.setState({
        servicesDs: this.state.servicesDs.cloneWithRowsAndSections(planMap),
      });
    } catch (err) {
      console.warn(err);
    }
  } 

  render() {
    return (
      <ListView style={{ backgroundColor: '#fff' }}
        enableEmptySections
        dataSource={this.state.servicesDs}
        renderRow={(rowData, secId) =>
          <Plan data={rowData} />}
        renderSeparator={(secId, rowId) =>
          <View key={`${secId}-${rowId}`} style={styles.divider} />}
        renderSectionHeader={(secData, category) =>
          <Subheader text={category} />}
      />
    );
  }
}

export default ServicesScene;
