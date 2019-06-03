import React from 'react';
import {FlatList, ListRenderItemInfo, Modal, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import DropdownUI from "./DropdownUI";
import {capitalize} from "../utils/utils";

interface Props {
  title: string;
  defaultValue: string;
  values: string[];
  onSelect: (value: string) => void;
  style: StyleProp<ViewStyle>;
}

interface State {
  selectedValue: string;
  modalVisible: boolean;
}

export default class Dropdown extends React.Component<Props, State> {
  state: State = {
    selectedValue: this.props.defaultValue,
    modalVisible: false,
  };

  private selectItem(selectedValue: string): void {
    this.setState({selectedValue: selectedValue});
    this.props.onSelect(selectedValue);
    this.closeModal();
  }

  private openModal(): void {
    this.setState({modalVisible: true});
  }

  private closeModal(): void {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View style={this.props.style}>
        <DropdownUI
          title={this.props.title}
          value={capitalize(this.state.selectedValue)}
          onTouchEnd={this.openModal.bind(this)}
        />
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal.bind(this)}>
          <View
            style={styles.dimmedBackground}
            onTouchEnd={this.closeModal.bind(this)}>
            <View style={styles.box}>
              <FlatList
                data={[{key: 'week'},{key: 'day'}]}
                renderItem={({item}: ListRenderItemInfo<{key: string}>) => { return (
                  <Text
                    onPress={() => this.selectItem(item.key)}
                    style={styles.listItem}
                  >{capitalize(item.key)}</Text>
                )}}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},

  dimmedBackground: {
    backgroundColor: '#00000070',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  box: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 10
  },

  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
});
