import {ChartData} from "../models/ChartData";
import moment, {Moment} from "moment";
import {Color} from "../models/Color";

export class ChartDataBuilder {
  private readonly chartData: ChartData;
  private readonly MAX_LABELS = 7;

  constructor() {
    this.chartData = this.createInitialChartData();
  }

  private createInitialChartData(): ChartData {
    return {
      labels: [],
      dataSets: [],
    }
  }

  public setLabels(dates: Moment[]): ChartDataBuilder {
    let labelDates: Moment[] = [];

    if (dates.length <= 7) {
      labelDates = [...dates];
    } else {
      labelDates = [...Array(this.MAX_LABELS).keys()].map((val: number, index: number) => {
        const datesIndex = Math.floor(dates.length / (this.MAX_LABELS) * index);
        return dates[datesIndex];
        });
    }

    if (moment.min(labelDates).add(1, 'days').isBefore(moment.max(labelDates))) {
      this.chartData.labels = labelDates.map((date: Moment) => date.format('DD/MM'));
    } else {
      this.chartData.labels = labelDates.map((date: Moment) => date.format('HH:mm'));
    }
    return this;
  }

  public addDataPoints(points: number[], color: Color): ChartDataBuilder {
    this.chartData.dataSets.push({
      points: points,
      color: color,
    });
    return this;
  }

  public build(): ChartData {
    return {...this.chartData};
  }
}
