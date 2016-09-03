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
    isLastBuildAtIntegration,
    isLastBuildAtProduction,
    isIntegrationAlive,
    isProductionAlive,
  };
};

const getPlanIcon = (plan, planMetrics) => {
  if (!plan.latestResult.successful ||
    !planMetrics.isIntegrationAlive ||
    !planMetrics.isProductionAlive) {
    return 'error';
  }
  if (!planMetrics.isLastBuildAtIntegration ||
    !planMetrics.isLastBuildAtProduction) {
    return 'warning';
  }
  return 'good';
};

class MonitorService {

  async getPlansData() {
    const plans = await bamboo.getPlans();
    const sensors = await prtg.getServiceSensors();
    // console.warn('!!!', JSON.stringify(sensors));
    return plans.map(plan => {
      const metrics = getPlanMetrics(plan, sensors);
      const icon = getPlanIcon(plan, metrics);
      return { ...plan, metrics, icon };
    });
  }
}

export default new MonitorService();
