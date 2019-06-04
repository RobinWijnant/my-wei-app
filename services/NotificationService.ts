import environment from "../config/environment";
import {Notifications, Permissions} from "expo";
import {MyWeiType} from "../models/MyWeiType";

const ENDPOINT = environment.api.url + 'expo';

async function getToken(): Promise<string | null> {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS); // happens only in IOS on click
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  try {
    return await Notifications.getExpoPushTokenAsync();
  } catch(error) {
    return null;
  }
}

export default {
  async register(myWeiType: MyWeiType): Promise<boolean> {
    const token = await getToken();
    if (token === null) return false;

    try {
      const response = await fetch(ENDPOINT + '/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          myWeiType: myWeiType
        }),
      });
      return response.status === 200;
    } catch(error) {
      return false;
    }
  },

  async unregister(myWeiType: MyWeiType): Promise<boolean> {
    try {
      const token =  await Notifications.getExpoPushTokenAsync();
      const response = await fetch(ENDPOINT + '/unregister', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          myWeiType: myWeiType
        }),
      });
      return response.status === 200;
    } catch(error) {
      return false;
    }
  },

  async checkRegistrations(): Promise<MyWeiType[]> {
    try {
      const token =  await getToken();
      const response = await fetch(ENDPOINT + '/registrations/' + token);
      return await response.json() as MyWeiType[];
    } catch(error) {
      return [];
    }
  }
};
