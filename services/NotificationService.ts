import environment from "../config/environment";
import {Notifications, Permissions} from "expo";
import {MyWeiType} from "../models/MyWeiType";

const ENDPOINT = environment.api.url + 'expo/register';

async function getToken(): Promise<string | null> {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS); // happens only in IOS
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('permissions not granted');
    return null;
  }

  return Notifications.getExpoPushTokenAsync();
}

export default {
  async register(myWeiType: MyWeiType): Promise<boolean> {
    const token = await getToken();
    if (token === null) return false;

    try {
      const response = await fetch(ENDPOINT, {
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
      return response.status === 200 || response.status === 201;
    } catch(error) {
      return false;
    }
  },

  async unregister(myWeiType: MyWeiType): Promise<boolean> {
    let token = await Notifications.getExpoPushTokenAsync();
    return true;
  },

  async isRegistered(myWeiType: MyWeiType): Promise<boolean> {
    return true;
  }
};
