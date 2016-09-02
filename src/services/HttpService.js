// NOTE: credentials is required for sending cookies with the request!
import base64 from 'base-64';

const baseUrl = 'https://www.check24.de/versicherungsordner/dashboard/api';
const hash = base64.encode('veve:veve');

class HttpService {

  async get(path) {
    try {
      const response = await fetch(baseUrl + path, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${hash}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      return json.data ? json.data : json;
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }

  async post(path, data) {
    try {
      const response = await fetch(baseUrl + path, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${hash}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return json.data ? json.data : json;
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }
}

export default new HttpService();
