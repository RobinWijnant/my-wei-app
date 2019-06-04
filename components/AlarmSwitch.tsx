import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

enum SwitchStatus {
  On, Off, Switching
}

interface Props {
  defaultStatus: Promise<boolean>;
  onSwitch: (switchedOn: boolean) => Promise<boolean>;
  style?: StyleProp<ViewStyle>;
}

interface State {
  switchStatus: SwitchStatus;
}

export default class AlarmSwitch extends React.Component<Props, State> {
  state: State = {
    switchStatus: SwitchStatus.Off,
  };

  constructor(props: Props) {
    super(props);
    this.props.defaultStatus.then((switchedOn: boolean) => this.setState({
      switchStatus: switchedOn ? SwitchStatus.On : SwitchStatus.Off
    }));
  }

  private onToggle(): void {
    if (this.state.switchStatus === SwitchStatus.Switching) return;
    this.setState({switchStatus: SwitchStatus.Switching});
    const switchStatusBoolean = this.state.switchStatus === SwitchStatus.On;
    this.props.onSwitch(!switchStatusBoolean)
      .then((status: boolean) => {
        if (status) this.setState({switchStatus: SwitchStatus.On});
        else this.setState({switchStatus: SwitchStatus.Off});
      });
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.title}>Alarm</Text>
        <View
          style={[
            styles.box,
            this.state.switchStatus === SwitchStatus.On && styles.switchedOn,
            this.state.switchStatus === SwitchStatus.Switching && styles.switchSwitching,
          ]}
          onTouchEnd={this.onToggle.bind(this)}>
          <Ionicons name="md-notifications" size={18} color="#CECECE" />
          <Text style={styles.statusText}>{ this.state.switchStatus === SwitchStatus.On ? 'On' : 'Off' }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 8,
    color: '#7D7D7D',
  },

  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    padding: 15,
    alignSelf: 'flex-start',
    borderColor: '#CECECE',
  },

  switchedOn: {
    borderColor: '#99e157',
  },

  switchSwitching: {
    borderColor: '#e1b357',
  },

  statusText: {
    color: '#7D7D7D',
    fontSize: 16,
    fontFamily: 'Lato Bold',
    marginLeft: 10,
  },
});
