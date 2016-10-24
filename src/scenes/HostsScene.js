import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Subheader } from 'react-native-material-design';
import ListItem from '../components/ListItem';

const data = {
  text: ['Inbox', 'Sent Items'],
  'text-secondary': [{
    primaryText: 'Spam',
    secondaryText: 'Any items here have been considered junk',
  }, {
    primaryText: 'Drafts',
    secondaryText: 'View any unsent emails',
  }],
  'avatar-text': [
    { primaryText: 'Jsa', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg' },
    { primaryText: 'Pixeliris', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/pixeliris/128.jpg' },
    { primaryText: 'Ok', secondaryText: 'Supporting text', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ok/128.jpg' },
    { primaryText: 'Marcosmoralez', secondaryText: 'Supporting text', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcosmoralez/128.jpg' },
  ],
};

class ListExample extends Component { // eslint-disable-line

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Subheader text="Basic Text Example" />
        {data.text.map((text, i) => (
          <ListItem
            key={i}
            primaryText={text}
          />
        ))}
      </ScrollView>
    );
  }
}

export default ListExample;
