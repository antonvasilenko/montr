import base64 from 'base-64';

const BAMBOO_URL = 'https://www.check24.de/versicherungsordner/dashboard/api/bamboo';

const getServiceStatus = async () => {
  try {
    const hash = base64.encode('veve:veve');
    const response = await fetch(BAMBOO_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${hash}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json.data ? json.data : json;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default {
  getServiceStatus,
};
