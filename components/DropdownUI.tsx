import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Props {
  value: string;
  onTouchEnd: () => void;
}

interface State {}

export default class DropdownUI extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container} onTouchEnd={this.props.onTouchEnd}>
        <Text style={styles.date}>{this.props.value}</Text>
        <Ionicons name="md-arrow-dropdown" size={24} color="#CECECE" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    padding: 15,
    borderColor: '#CECECE',
  },

  date: {
    color: '#7D7D7D',
    fontSize: 16,
    fontFamily: 'Lato Bold',
    marginRight: 15,
  },
});