import {ChartData} from "../models/ChartData";
import {Reading} from "../models/Reading";
import moment, {Moment} from "moment";

export class ChartDataBuilder {
  private readonly chartData: ChartData;

  constructor() {
    this.chartData = this.createInitialChartData();
  }

  private createInitialChartData(): ChartData {
    return {
      labels: [],
      dataSets: [],
    }
  }

  public setReadings(readings: Reading[]): ChartDataBuilder {
    this.chartData.labels = this.createLabels(readings.map((reading: Reading) => reading.dateTime));
    this.chartData.dataSets.push({
      points: readings.map((reading: Reading) => reading.value),
      color: {
        red: 87,
        green: 151,
        blue: 225
      }
    });
    return this;
  }

  private createLabels(dates: Moment[]): string[] {
    if (moment.min(dates).add(1, 'days').isBefore(moment.max(dates))) {
      return dates.map((date: Moment) => date.format('DD/MM'));
    } else {
      return dates.map((date: Moment) => date.format('HH:mm'));
    }
  }

  public build(): ChartData {
    return {...this.chartData};
  }
}
