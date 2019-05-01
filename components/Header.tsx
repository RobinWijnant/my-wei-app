import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';

interface Props {
  title: string;
  img: ImageSourcePropType;
}

interface State {}

export default class Header extends React.Component<Props, State> {
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  leftContainer: {
    flex: 1,
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
    resizeMode: 'contain',
  },

  title: {
    fontSize: 30,
    fontFamily: 'Lato Bold',
    marginLeft: 30,
    marginTop: 30,
  },

  icon: {
    width: 300,
    height: 300,
    marginTop: -55,
    marginRight: -70,
    resizeMode: 'contain',
  }
});