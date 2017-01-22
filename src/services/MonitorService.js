import bamboo from './BambooService';
import prtg from './PrtgService';
import groupBuilds from './group-plans';
import {
  onFetchBuildsStarted,
  onFetchBuildsSucceeded,
  onBuildsFetchFailed,
  getBuildsLoading,
} from '../modules/builds';
import { updateThemeByIssues } from '../modules/theme';

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

const getPlansData = () =>
  Promise.all([bamboo.getPlans(), prtg.getServiceSensors()])
    .then(([plans, sensors]) =>
      plans.map(plan => {
        const deployments = getDeploymentStatuses(plan, sensors);
        return {
          lastBuild: plan.latestResult.buildNumber,
          name: plan.name,
          icon: getPlanIcon(plan, deployments),
          deployments,
        };
      })
    )
    .catch(er => console.log('error during fetching builds and sensors', er));

export const getErrorsCount = (list) => getCountOfIssuesOfType('error')(list);
export const getWarningsCount = (list) => getCountOfIssuesOfType('warning')(list);


// TODO simplify work with promise (some async redux helper or reactive redux)
export const fetchBuilds = () => async (dispatch, getState) => {
  if (getBuildsLoading(getState())) return; // to avoid simultaneous http calls
  dispatch(onFetchBuildsStarted());
  try {
    const buildsList = await getPlansData();
    const groups = groupBuilds(buildsList);
    const errors = getErrorsCount(buildsList);
    const warnings = getWarningsCount(buildsList);
    dispatch(onFetchBuildsSucceeded(buildsList, groups, errors, warnings));
    dispatch(updateThemeByIssues(errors, warnings));
  } catch (err) {
    dispatch(onBuildsFetchFailed(err));
    dispatch(updateThemeByIssues(1, 0));
  }
};

