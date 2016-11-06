import bamboo from './BambooService';
import prtg from './PrtgService';

const targetsAliases = {
  integration: 'int',
  production: 'prod',
  uptime: 'uptime',
};

const getDeploymentStatus = (planName, lastBuild, deployment, sensors) => {
  const serviceSensor = sensors && sensors.find(s => s.name === planName);
  return {
    latest: deployment && deployment.planResultNumber === lastBuild,
    alive: serviceSensor ? serviceSensor.up : undefined,
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
      if (latestDeployments[key] && latestDeployments[key].id && sensors[key]) {
        deployments.push({
          name: target,
          ...getDeploymentStatus(plan.name, lastBuild, latestDeployments[key], sensors[key]),
        });
      }
    });
  }
  return deployments;
};

const getPlanIcon = (plan, deployments) => {
  if (!plan.latestResult.successful ||
    (deployments.length > 0 && deployments.find(d => d.alive === false))) {
    return 'error';
  }
  if (deployments.length > 0 && deployments.find(d => !d.latest)) {
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
      const deployments = getDeploymentStatuses(plan, sensors);
      return {
        lastBuild: plan.latestResult.buildNumber,
        name: plan.name,
        icon: getPlanIcon(plan, deployments),
        deployments,
      };
    });
  }

  getErrorsCount = (list) => getCountOfIssuesOfType('error')(list);
  getWarningsCount = (list) => getCountOfIssuesOfType('warning')(list);

}

export default new MonitorService();
