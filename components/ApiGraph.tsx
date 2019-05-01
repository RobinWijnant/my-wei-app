import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  defaultTimeSpan: string;
  defaultDate: string;
}

interface State {}

export default class ApiGraph extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pickers}>
          {/*<Picker*/}
          {/*  selectedValue={this.props.defaultTimeSpan}*/}
          {/*  style={styles.timeSpanPicker}*/}
          {/*  onValueChange={(itemValue, itemIndex) =>*/}
          {/*    this.setState({language: itemValue})*/}
          {/*  }>*/}
          {/*  <Picker.Item label="Java" value="java" />*/}
          {/*  <Picker.Item label="JavaScript" value="js" />*/}
          {/*</Picker>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

  pickers: {
  },

  timeSpanPicker: {
  },
});