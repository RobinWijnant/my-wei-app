import React from 'react';
import {Font} from "expo";
import {StyleSheet, View} from 'react-native';
import SolarPanelVoltage from "./pages/SolarPanelVoltage";

export default class App extends React.Component {
  state = {
    isFontLoaded: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <SolarPanelVoltage
          isFontLoaded={this.state.isFontLoaded}
        />
      </View>
    );
  }

  componentDidMount() {
    Font.loadAsync({
      'Lato Bold': require('./assets/fonts/Lato-Bold.ttf'),
    }).then(() => this.setState({ isFontLoaded: true }))
      .catch(() => console.log('failed'));
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
