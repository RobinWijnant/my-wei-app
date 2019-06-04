import {Reading} from "../models/Reading";
import environment from "../config/environment";
import moment, {Moment} from "moment";
import ApiService from "./ApiService";
import {MyWeiType} from "../models/MyWeiType";

interface ApiReading {
  value: number,
  dateTime: Date,
}

function fetchReadings(url: string): Promise<Reading[]> {
  return ApiService.fetchJson(url)
    .then((apiReadings: ApiReading[]) => apiReadings.map((apiReading: ApiReading) => {
      return {
        ...apiReading,
        dateTime: moment(apiReading.dateTime),
      }
    }));
}

export default {
  async getValues(myWeiType: MyWeiType, period: string, date: Moment): Promise<Reading[]> {
    const url = environment.api.url + 'readings/' + environment.api.deviceUuid + '/' + myWeiType + '?' +
      ApiService.createQueryParameterString({
        timeSpan: period,
        date: date.format('YYYY-MM-DD'),
        utcOffset: String(Math.floor(new Date().getTimezoneOffset() / 60 * -1)),
      });

    return fetchReadings(url);
  }
};
