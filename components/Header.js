import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.circle}>
            <Image source={require('../assets/icons/menu.png')} style={styles.menuIcon} />
          </View>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <Image source={this.props.img} style={styles.icon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 300,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  leftContainer: {
  },

  circle: {
    width: 140,
    height: 140,
    marginLeft: -30,
    marginTop: -20,
    borderRadius: 100,
    backgroundColor: '#ECECEC',
  },

  menuIcon: {
    marginLeft: 60,
    marginTop: 60,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },

  title: {
    fontSize: 30,
  },

  icon: {
    width: 350,
    height: 350,
    marginTop: -100,
    marginRight: -100,
    resizeMode: 'contain'
  }
});