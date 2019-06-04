import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Props {
  title: string;
  value: string;
  onTouchEnd: () => void;
}

interface State {}

export default class DropdownUI extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.box} onTouchEnd={this.props.onTouchEnd}>
          <Text style={styles.value}>{this.props.value}</Text>
          <Ionicons name="md-arrow-dropdown" size={24} color="#CECECE" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},

  title: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 8,
    color: '#7D7D7D',
  },

  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    padding: 15,
    borderColor: '#CECECE',
  },

  value: {
    color: '#7D7D7D',
    fontSize: 16,
    fontFamily: 'Lato Bold',
    marginRight: 10,
  },
});
