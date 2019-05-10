import React from 'react';
import {DatePickerAndroid, DatePickerAndroidOpenReturn, DatePickerIOS, Platform, View} from 'react-native';
import {formatDate} from "../utils/utils";
import DropdownUI from "./DropdownUI";

interface Props {
  date: Date;
}

interface State {
  date: Date;
}

export default class DatePicker extends React.Component<Props, State> {
  state: State = {
    date: this.props.date
  };

  private async openDatePicker() {
    try {
      const result: DatePickerAndroidOpenReturn = await DatePickerAndroid.open({date: this.state.date});
      if (result.action === DatePickerAndroid.dateSetAction && result.year && result.month && result.day) {
        this.onDateSelected(new Date(result.year, result.month, result.day))
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  private onDateSelected(date: Date) {
    this.setState({date: date});
  }

  render() {
    return (
      <View>
        { Platform.OS === 'android' && <DropdownUI
          value={formatDate(this.state.date)}
          onTouchEnd={this.openDatePicker.bind(this)}
        />}
        { Platform.OS === 'ios' && <DatePickerIOS
          date={this.state.date}
          onDateChange={this.onDateSelected}
        />}
      </View>
    );
  }
}