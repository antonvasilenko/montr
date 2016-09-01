import React, { Component } from 'react';
import {
  Text,
  ScrollView, Image,
  ListView, TouchableHighlight,
} from 'react-native';
import {
  Subheader, Icon,
  Avatar, IconToggle,
} from 'react-native-material-design';
import ListItem from '../components/ListItem';
import monitoringService from '../services/MonitoringService';

class ListExample extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    const servicesDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      servicesDs: servicesDs.cloneWithRows([{ name: 'no data yet', enabled: false }]),
    };
  }

  componentDidMount() {
    this.loadData();
    this.timer = setInterval(this.loadData, 5000);
  }

  loadData = async () => {
    const statuses = await monitoringService.getServiceStatus();
    console.warn('data loaded');
    this.setState({
      servicesDs: this.state.servicesDs.cloneWithRows(statuses),
    }); 
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

  renderServicesRow = item =>
    <ListItem
      primaryText={item.name}
      secondaryText={this.renderRowSummary(item)}
      leftIcon={this.renderRowIcon(item)}
    />;

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <TouchableHighlight onPress={this.loadData}>
          <Text style={{ backgroundColor: 'green', padding: 5 }}>Get Data</Text>
        </TouchableHighlight>
        <Subheader text="Basic Text Example" />
        <ListView
          dataSource={this.state.servicesDs}
          renderRow={this.renderServicesRow}
        />
      </ScrollView>
    );
  }
}

export default ListExample;
