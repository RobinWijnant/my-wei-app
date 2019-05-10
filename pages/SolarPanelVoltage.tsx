import React from 'react';
import Header from "../components/Header";
import {StyleSheet, View} from 'react-native';
import DatePicker from "../components/DatePicker";
import ApiGraph from "../components/ApiGraph";
import Dropdown from "../components/Dropdown";

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
          <Dropdown
            title={'Period'}
            defaultValue='day'
            values={['day', 'week']}
            onSelect={() => {}}
            style={styles.dropdown}
          />
          <DatePicker date={this.state.date} />
        </View>
        <ApiGraph />
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
    justifyContent: 'flex-start',
    padding: 30,
  },

  dropdown: {
    marginRight: 20,
  }
});
