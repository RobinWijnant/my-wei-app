import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import {LineChart} from 'react-native-chart-kit';
import {ChartData} from "../models/ChartData";
import {ChartDataSet} from "../models/ChartDataSet";
import {Color} from "../models/Color";
import {LineChartData} from "../models/LineChartData";

interface Props {
  chartData: ChartData;
}
interface State {
}

export default class ApiGraph extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  private config = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(49, 49, 49, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  };

  private getLineChartData(): LineChartData {
    return {
      labels: this.props.chartData.labels,
      datasets: this.refactorDataSets()
    };
  }

  private refactorDataSets(): LineChartData['datasets'] {
    return this.props.chartData.dataSets.map((dataSet: ChartDataSet) => {
      return {
        data: dataSet.points,
        color: (opacity = 1) => this.createRgbaString(dataSet.color, opacity)
      };
    });
  }

  private createRgbaString(color : Color, opacity: number): string {
    return 'rgba(' + color.red + ', ' + color.green + ', ' + color.blue + ', ' + opacity + ')';
  }

  render() {
    const lineChartData = this.getLineChartData();
    const chartDataAvailable = Boolean(lineChartData.labels.length > 0);
    return (
      <View style={styles.container}>
        { chartDataAvailable && <LineChart
          data={lineChartData}
          width={Dimensions.get('window').width - 40}
          height={300}
          chartConfig={this.config}
          bezier
        /> }
        { !chartDataAvailable && <Text style={styles.text}>No data available</Text> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 300,
    marginLeft: 10,
    marginRight: 10,
  },

  text: {
    textAlign: 'center',
    marginTop: 100,
    marginLeft: -10,
    color: 'grey',
  },
});
