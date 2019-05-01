import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import DropdownUI from "./DropdownUI";

interface Props {
  defaultValue: string;
  values: string[];
  onSelect: (selectedValue: string) => void;
  style: StyleProp<ViewStyle>;
}

interface State {
  selectedValue: string;
}

export default class Dropdown extends React.Component<Props, State> {
  state: State = {
    selectedValue: this.props.defaultValue,
  };

  private onSelect(selectedValue: string) {
    this.setState({selectedValue: selectedValue});
    this.props.onSelect(this.state.selectedValue);
  }

  private openModal() {

  }

  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Fruits' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
      { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
    ];

    return (
      <View style={this.props.style}>
        <DropdownUI
          value={this.state.selectedValue}
          onTouched={() => this.openModal()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});