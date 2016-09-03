import http from './HttpService';

class PrtgService {

  getHostSensors() {
    return http.get('/prtg/hosts');
  }

  getServiceSensors() {
    return http.get('/prtg/services');
  }
}

export default new PrtgService();
