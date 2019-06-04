import React from 'react';
import Header from "../components/Header";
import {Image, StyleSheet, View} from 'react-native';
import DatePicker from "../components/DatePicker";
import ApiGraph from "../components/ApiGraph";
import Dropdown from "../components/Dropdown";
import {ChartData} from "../models/ChartData";
import moment, {Moment} from "moment";
import MyWeiApiService from "../services/MyWeiApiService";
import {ChartDataBuilder} from "../utils/ChartDataBuilder";
import {Reading} from "../models/Reading";
import AlarmSwitch from "../components/AlarmSwitch";
import NotificationService from "../services/NotificationService";
import {MyWeiType} from "../models/MyWeiType";

interface Props {
}

interface State {
  period: string;
  date: Moment;
  chartData: ChartData;
  chartLoaded: boolean;
  defaultSwitchStatus: Promise<boolean>,
}

export default class SolarPanelVoltage extends React.Component<Props, State> {
  state: State = {
    period: 'day',
    date: moment(),
    chartData: {
      labels: [],
      dataSets: [],
    },
    chartLoaded: false,
    defaultSwitchStatus: this.getDefaultSwitchStatus(),
  };

  constructor(props: Props) {
    super(props);

    this.createChartData(this.state.period, this.state.date)
      .then((chartData: ChartData) => this.setState({chartData: chartData, chartLoaded: true}));
  }

  private getDefaultSwitchStatus(): Promise<boolean> {
    return NotificationService.checkRegistrations()
      .then((types: MyWeiType[]) => {
        return types.findIndex((type: MyWeiType) => type === MyWeiType.SolarPanelVoltage) > -1;
      });
  }

  private changeDate(date: Moment): void {
    this.setState({chartLoaded: false});
    this.createChartData(this.state.period, date)
      .then((chartData: ChartData) => this.setState({
        date: date,
        chartData: chartData,
        chartLoaded: true,
      }));
  }

  private changePeriod(period: string): void {
    this.setState({chartLoaded: false});
    this.createChartData(period, this.state.date)
      .then((chartData: ChartData) => this.setState({
        period: period,
        chartData: chartData,
        chartLoaded: true,
      }));
  }

  private async createChartData(period: string, date: Moment): Promise<ChartData> {
    const readings = await MyWeiApiService.getSolarPanelVoltages(period, date);
    return new ChartDataBuilder()
      .setLabels(readings.map((reading: Reading) => reading.dateTime), period)
      .addDataPoints(readings.map((reading: Reading) => reading.value), {red: 87, green: 151, blue: 225})
      .build();
  }

  private async toggleAlarm(alarmOn: boolean): Promise<boolean> {
    if (alarmOn) {
      return await NotificationService.register(MyWeiType.SolarPanelVoltage);
    } else {
      return !(await NotificationService.unregister(MyWeiType.SolarPanelVoltage));
    }
  }

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
            defaultValue={this.state.period}
            values={['day', 'week']}
            onSelect={this.changePeriod.bind(this)}
            style={styles.picker}
          />
          <DatePicker style={styles.picker} date={this.state.date} onSelect={this.changeDate.bind(this)}/>
          <AlarmSwitch defaultStatus={this.state.defaultSwitchStatus} onSwitch={this.toggleAlarm}/>
        </View>
        {!this.state.chartLoaded && <View style={styles.loadingContainer}>
          <Image source={require('../assets/icons/loading.gif')} style={styles.loading}/>
        </View>}
        {this.state.chartLoaded && <ApiGraph chartData={this.state.chartData}/>}
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
    paddingBottom: 50,
  },

  loadingContainer: {
    marginTop: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  loading: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  picker: {
    marginRight: 12,
  },
});
