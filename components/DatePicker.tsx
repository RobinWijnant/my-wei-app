import React from 'react';
import {DatePickerAndroid, DatePickerAndroidOpenReturn} from 'react-native';
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

  async openDatePicker() {
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
      <DropdownUI value={formatDate(this.state.date)} onTouched={this.openDatePicker.bind(this)} />
    );
  }
}