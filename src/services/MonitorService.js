import http from './HttpService';
import bamboo from './BambooService';
import prtg from './PrtgService';

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
  let planColor;
  let planIcon;
  const plan = planMetrics.plan;
  if (!plan.latestResult.successful ||
    !planMetrics.isIntegrationAlive ||
    !planMetrics.isProductionAlive) {
    planColor = 'BuildPlan-statusBad';
    planIcon = 'glyphicon glyphicon-remove-sign';
  } else if (!planMetrics.isLastBuildAtIntegration ||
    !planMetrics.isLastBuildAtProduction) {
    planColor = 'BuildPlan-statusWarning';
    planIcon = 'glyphicon glyphicon-ok-sign';
  } else {
    planColor = 'BuildPlan-statusGood';
    planIcon = 'glyphicon glyphicon-ok-sign';
  }
  return {
    icon: planIcon,
    color: planColor,
  };
};

class MonitorService {

  async getPlanData() {
    bamboo.getPlans()
      .then(plans => {
        this.setState({ plans });
      })
      .catch(err => console.error(err));
    prtg.getServiceSensors()
      .then(sensors => {
        this.setState({ sensors });
      })
      .catch(err => console.error(err));
  }

  getPlansData() {
    return bamboo.getPlans();
  }
}

export default new MonitorService();
