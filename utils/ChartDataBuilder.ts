import {ChartData} from "../models/ChartData";
import {Moment} from "moment";
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

  public setLabels(dates: Moment[], period: string): ChartDataBuilder {
    let labelDates: Moment[] = [];

    if (dates.length <= 7) {
      labelDates = [...dates];
    } else {
      labelDates = [...Array(this.MAX_LABELS).keys()].map((val: number, index: number) => {
        const datesIndex = Math.floor(dates.length / (this.MAX_LABELS) * index);
        return dates[datesIndex];
        });
    }

    switch (period) {
      case 'week':
        this.chartData.labels = labelDates.map((date: Moment) => date.format('DD/MM'));
        break;
      case 'day':
        this.chartData.labels = labelDates.map((date: Moment) => date.format('HH:mm'));
        break;
      default:
        this.chartData.labels = ['Invalid labels'];
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
