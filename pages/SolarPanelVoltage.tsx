import React from 'react';
import Header from "../components/Header";
import {StyleSheet, View} from 'react-native';
import DatePicker from "../components/DatePicker";
import ApiGraph from "../components/ApiGraph";
import Dropdown from "../components/Dropdown";
import {ChartData} from "../models/ChartData";
import moment, {Moment} from "moment";
import MyWeiApiService from "../services/MyWeiApiService";
import {ChartDataBuilder} from "../utils/ChartDataBuilder";

interface Props {
}

interface State {
  period: string;
  date: Moment;
  chartData: ChartData;
}

export default class SolarPanelVoltage extends React.Component<Props, State> {
  state: State = {
    period: 'day',
    date: moment(),
    chartData: {
      labels: [],
      dataSets: [],
    },
  };

  constructor(props: Props) {
    super(props);
    this.createChartData(this.state.period, this.state.date)
      .then((chartData: ChartData) => this.setState({chartData: chartData}));
  }

  private changeDate(date: Moment) {
    this.createChartData(this.state.period, date)
      .then((chartData: ChartData) => this.setState({
        date: date,
        chartData: chartData,
      }));
  }

  private changePeriod(period: string) {
    this.createChartData(period, this.state.date)
      .then((chartData: ChartData) => this.setState({
        period: period,
        chartData: chartData
      }));
  }

  private async createChartData(period: string, date: Moment): Promise<ChartData> {
    const readings = await MyWeiApiService.getSolarPanelVoltages(period, date);
    return new ChartDataBuilder().setReadings(readings).build();
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
            style={styles.dropdown}
          />
          <DatePicker date={this.state.date} onSelect={this.changeDate.bind(this)} />
        </View>
        <ApiGraph chartData={this.state.chartData} />
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

  dropdown: {
    marginRight: 20,
  }
});
