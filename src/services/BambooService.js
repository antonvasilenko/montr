import http from './HttpService';

const getCategory = (plan) => {
  if (plan && plan.name) {
    if (plan.name.indexOf('-service') > 0
      || plan.name.indexOf('processor') > 0) {
      return 'Backend';
    }
    if (plan.name.indexOf('-app') > 0) {
      return 'Frontend';
    }
    if (plan.name.indexOf('test') > 0) {
      return 'Tests';
    }
  }
  return 'Other';
};

class BambooService {

  getPlans() {
    return http.get('/bamboo');
  }

  getHostSensors() {
    return http.get('/prtg/hosts');
  }

  getServiceSensors() {
    return http.get('/prtg/services');
  }

  async getGroupedPlans() {
    const plansList = await this.getPlans();
    const plansMap = {
     Backend: [], Frontend: [], Tests: [], Other: [],
    };
    plansList.forEach(plan => plansMap[getCategory(plan)].push(plan));
    return plansMap;
  }
}

export default new BambooService();
