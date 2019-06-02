import {Reading} from "../models/Reading";
import environment from "../config/environment";
import moment, {Moment} from "moment";
import ApiService from "./ApiService";

interface ApiReading {
  value: number,
  dateTime: Date,
}

function parseReading(apiReading: ApiReading): Reading {
  return {
    value: apiReading.value,
    dateTime: moment(apiReading.dateTime),
  }
}

function fetchReadings(url: string): Promise<Reading[]> {
  return ApiService.fetchJson(url).then((apiReadings: ApiReading[]) => apiReadings.map(
    (apiReading: ApiReading) => parseReading(apiReading)
  ));
}

export default {
  async getSolarPanelVoltages(period: string, date: Moment): Promise<Reading[]> {
    const url = environment.api.url + 'readings/' + environment.api.deviceUuid + '/solarPanelVoltage?' +
      ApiService.createQueryParameterString({timeSpan: period, date: date.format('YYYY-MM-DD')});

    return fetchReadings(url);
  }
};
