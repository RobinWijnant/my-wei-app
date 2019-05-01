import React from 'react';
import Header from "../components/Header";
import {StyleSheet, View} from 'react-native';
import DatePicker from "../components/DatePicker";

interface Props {
}

interface State {
  date: Date;
}

export default class SolarPanelVoltage extends React.Component<Props, State> {
  state: State = {
    date: new Date(),
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'Solar panel voltage'}
          img={require('../assets/icons/solar-panel-voltage.png')}
        />
        <View style={styles.pickers}>
          <DatePicker date={this.state.date} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},

  pickers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 30,
  },
});
