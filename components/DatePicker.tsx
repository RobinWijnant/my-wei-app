import React from 'react';
import {
  DatePickerAndroid,
  DatePickerAndroidOpenReturn,
  DatePickerIOS,
  Platform,
  StyleProp,
  View,
  ViewStyle
} from 'react-native';
import DropdownUI from "./DropdownUI";
import moment, {Moment} from "moment";

interface Props {
  date: Moment;
  onSelect: (date: Moment) => void;
  style?: StyleProp<ViewStyle>;
}

interface State {
  date: Moment;
}

export default class DatePicker extends React.Component<Props, State> {
  state: State = {
    date: this.props.date
  };

  private async openDatePicker() {
    try {
      const result: DatePickerAndroidOpenReturn = await DatePickerAndroid.open({date: this.state.date.toDate()});
      if (result.action === DatePickerAndroid.dateSetAction && result.year && result.month && result.day) {
        this.onDateSelected(new Date(result.year, result.month, result.day))
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  private onDateSelected(date: Date) {
    const momentDate = moment(date);
    this.setState({date: momentDate});
    this.props.onSelect(momentDate);
  }

  render() {
    return (
      <View style={this.props.style}>
        { Platform.OS === 'android' && <DropdownUI
          title={'Date'}
          value={this.state.date.format('DD-MM-YYYY')}
          onTouchEnd={this.openDatePicker.bind(this)}
        />}
        { Platform.OS === 'ios' && <DatePickerIOS
          date={this.state.date.toDate()}
          onDateChange={this.onDateSelected}
        />}
      </View>
    );
  }
}
