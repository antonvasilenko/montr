import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { Subheader, List, Icon, Avatar, IconToggle } from 'react-native-material-design';

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

export default class ListExample extends Component { // eslint-disable-line

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Subheader text="Basic Text Example" />
        { data.text.map((text, i) => (
          <List
            key={i}
            primaryText={text}
          />
        ))}
        { data['text-secondary'].map((list, i) => (
          <List
            key={i}
            primaryText={list.primaryText}
            secondaryText={list.secondaryText}
          />
        ))}
        <Subheader text="Left Avatar" />
        { data['avatar-text'].map((item, i) => (
          <List
            key={i}
            primaryText={item.primaryText}
            secondaryText={item.secondaryText}
            leftAvatar={<Avatar image={<Image source={{ uri: item.avatar }} />} />}
          />
        ))}
        <List
          leftComponent={
            <IconToggle color="paperGrey900">
              <Icon
                name="business"
                color="paperGrey900"
              />
            </IconToggle>
          }
          primaryText="Some component"
        />
      </ScrollView>
    );
  }
}

