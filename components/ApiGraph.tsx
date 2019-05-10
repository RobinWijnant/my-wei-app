import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
// @ts-ignore
import { LineChart } from 'react-native-chart-kit';
import {ChartData} from "../models/ChartData";
import {ChartDataSet} from "../models/ChartDataSet";
import {Color} from "../models/Color";

interface Props {
  chartData: ChartData;
}
interface State {}

export default class ApiGraph extends React.Component<Props, State> {

  private config = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(49, 49, 49, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  };

  private data = {
    labels: this.getLabels(),
    datasets: this.getRefactoredDataSets()
  };

  private getLabels(): string[] {
    return this.props.chartData.labels;
  }

  private getRefactoredDataSets(): any {
    const chartRefactoredDataSets: {}[] = [];
    this.props.chartData.dataSets.forEach((dataSet: ChartDataSet) => {
      const chartRefactored: {data: number[], color: (opacity: number) => string} = {
        data: dataSet.points,
        color: (opacity = 1) => this.createRgbaString(dataSet.color, opacity)
      };
      chartRefactoredDataSets.push(chartRefactored);
    });
    return chartRefactoredDataSets;
  }

  private createRgbaString(color : Color, opacity: number): string {
    return 'rgba(' + color.red + ', ' + color.green + ', ' + color.blue + ', ' + opacity + ')';
  }

  render() {
    return (
      <View style={styles.container}>
        <LineChart
          data={this.data}
          width={Dimensions.get('window').width - 40}
          height={300}
          chartConfig={this.config}
          bezier
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginLeft: 10,
  },
});
