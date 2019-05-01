import React from 'react';
import Header from "../components/Header";
import ApiGraph from "../components/ApiGraph";
import {StyleSheet, View} from 'react-native';

export default class SolarPanelVoltage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'Solar panel voltage'}
          img={require('../assets/icons/solar-panel-voltage.png')}
          isFontLoaded={this.props.isFontLoaded}
        />
        <ApiGraph
          defaultTimeSpan='week'
          defaultDate='2019-05-01'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
