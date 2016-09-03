import http from './HttpService';

class PrtgService {

  getHostSensors() {
    return http.get('/hosts');
  }

  getServiceSensors() {
    return http.get('/services');
  }
}

export default new PrtgService();
