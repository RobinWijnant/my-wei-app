import React from 'react';
import {Font} from "expo";
import {StyleSheet, View} from 'react-native';
import SolarPanelVoltage from "./pages/SolarPanelVoltage";

interface Props {}

interface State {
  isFontLoaded: boolean
}

export default class App extends React.Component<Props, State> {
  state: State = {
    isFontLoaded: false,
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isFontLoaded && <SolarPanelVoltage/>}
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
