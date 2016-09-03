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

const getPlanMetrics = (plan, sensors) => {
  const deployment = plan.latestDeployment || {};
  const integration = deployment.integration || {};

  const isLastBuildAtIntegration = !integration.planResultNumber
    || integration.planResultNumber === plan.latestResult.buildNumber;
  const production = deployment.production || {};
  const isLastBuildAtProduction = !production.planResultNumber
    || production.planResultNumber === integration.planResultNumber;
  const integrationSensor = sensors.integration.find(s => s.name === plan.name);
  const isIntegrationAlive = !integrationSensor || (integrationSensor && integrationSensor.up);
  const productionSensor = sensors.production.find(s => s.name === plan.name);
  const isProductionAlive = !productionSensor || (productionSensor && productionSensor.up);
  return {
    plan,
    isLastBuildAtIntegration,
    isLastBuildAtProduction,
    isIntegrationAlive,
    isProductionAlive,
  };
};

const getPlanIcon = (planMetrics) => {
  let planClass;
  let planIcon;
  let planColor;
  const plan = planMetrics.plan;
  if (!plan.latestResult.successful ||
    !planMetrics.isIntegrationAlive ||
    !planMetrics.isProductionAlive) {
    planClass = 'BuildPlan-statusBad';
    planIcon = 'glyphicon glyphicon-remove-sign';
  } else if (!planMetrics.isLastBuildAtIntegration ||
    !planMetrics.isLastBuildAtProduction) {
    planClass = 'BuildPlan-statusWarning';
    planIcon = 'glyphicon glyphicon-ok-sign';
  } else {
    planClass = 'BuildPlan-statusGood';
    planIcon = 'glyphicon glyphicon-ok-sign';
  }
  return {
    className: planClass,
    icon: planIcon,
    color: planColor,
  };
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
