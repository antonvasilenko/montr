import http from './HttpService';

class BambooService {

  getPlans() {
    return http.get('/bamboo');
  }
}

export default new BambooService();
