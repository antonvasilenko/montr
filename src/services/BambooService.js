import http from './HttpService';

class BambooService {

  getPlans() {
    return http.get('/bamboo').then(res => res || []);
  }
}

export default new BambooService();
