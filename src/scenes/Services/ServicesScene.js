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
  Subheader, Header, Icon, COLOR,
} from 'react-native-material-design';

import ListItem from '../../components/ListItem';
import BambooService from '../../services/BambooService';

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
      const planMap = await BambooService.getGroupedPlans();
      if (!this.timer) return;
      this.setState({
        servicesDs: this.state.servicesDs.cloneWithRowsAndSections(planMap),
      });
    } catch (err) {
      console.warn(err);
    }
  }

  renderRowIcon = item => {
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
  }

  renderRowSummary = item => {
    if (item.latestDeployment) {
      return `int: #${item.latestDeployment.integration.planResultNumber} ` +
        `prod: #${item.latestDeployment.production.planResultNumber}`;
    }
    if (item.latestResult) {
      return `build-#${item.latestResult.buildNumber}`;
    }
    return 'no details :(';
  }

  renderServicesRow = (rowData, secId, rowId) =>
    <ListItem
      primaryText={rowData.name}
      secondaryText={this.renderRowSummary(rowData)}
      leftIcon={this.renderRowIcon(rowData)}
    />;

  render() {
    return (
      <ListView style={{ backgroundColor: '#fff' }}
        enableEmptySections
        dataSource={this.state.servicesDs}
        renderRow={this.renderServicesRow}
        renderSeparator={() => <View style={styles.divider} />}
        renderSectionHeader={(secData, category) =>
          <Subheader text={category} />}
      />
    );
  }
}

export default ServicesScene;
