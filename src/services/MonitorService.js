import bamboo from './BambooService';
import prtg from './PrtgService';

// TODO delete me when deployments data gets approved
const getPlanMetrics = (plan, sensors) => {
  const deployment = plan.latestDeployment || {};
  const integration = deployment.integration || {};
  const production = deployment.production || {};

  const isLastBuildAtIntegration = !integration.planResultNumber
    || integration.planResultNumber === plan.latestResult.buildNumber;
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

const targetsAliases = {
  integration: 'int',
  production: 'prod',
  uptime: 'uptime',
};

const getDeploymentStatus = (planName, lastBuild, deployment, sensors) => {
  const serviceSensor = sensors && sensors.find(s => s.name === planName);
  return {
    latest: deployment && deployment.planResultNumber === lastBuild,
    alive: serviceSensor && serviceSensor.up,
    build: (deployment && deployment.planResultNumber) || undefined,
  };
};

const getDeploymentStatuses = (plan, sensors) => {
  const deployments = [];
  if (plan && plan.latestDeployment && plan.latestResult) {
    const lastBuild = plan.latestResult.buildNumber;
    const latestDeployments = plan.latestDeployment;
    Object.keys(targetsAliases).forEach(key => {
      const target = targetsAliases[key];
      if (latestDeployments[key] && sensors[key]) {
        deployments.push({
          name: target,
          ...getDeploymentStatus(plan.name, lastBuild, latestDeployments[key], sensors[key]),
        });
      }
    });
  }
  return deployments;
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

const getCountOfIssuesOfType = type => list =>
  list.reduce((num, pl) => (num + (pl.icon === type ? 1 : 0)), 0) || 0;

class MonitorService {

  async getPlansData() {
    const plans = await bamboo.getPlans() || [];
    const sensors = await prtg.getServiceSensors();
    return plans.map(plan => {
      const metrics = getPlanMetrics(plan, sensors);
      const deployments = getDeploymentStatuses(plan, sensors);
      const icon = getPlanIcon(plan, metrics);
      return { ...plan, metrics, deployments, icon };
    });
  }

  getErrorsCount = (list) => getCountOfIssuesOfType('error')(list);
  getWarningsCount = (list) => getCountOfIssuesOfType('warning')(list);

}

export default new MonitorService();
