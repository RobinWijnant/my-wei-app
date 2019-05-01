import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.circle}>
            <Image source={require('../assets/icons/menu.png')} style={styles.menuIcon} />
          </View>
          { this.props.isFontLoaded ? <Text style={styles.title}>{this.props.title}</Text> : null }
        </View>
        <Image source={this.props.img} style={styles.icon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 300,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  leftContainer: {
    flex: 1
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
    fontFamily: 'Lato Bold',
    marginLeft: 30,
    marginTop: 30
  },

  icon: {
    width: 300,
    height: 300,
    marginTop: -55,
    marginRight: -70,
    resizeMode: 'contain'
  }
});