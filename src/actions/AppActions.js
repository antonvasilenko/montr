import alt from '../alt';
import monitorService from '../services/MonitorService';

const updateIssues = (plansData = []) => {
  const errors = plansData.reduce(
    (err, pl) => (err + pl.type === 'error' ? 1 : 0), 0);
  if (errors > 0) {
    return {
      count: errors,
      type: 'error',
    };
  }
  const warnings = plansData.reduce(
    (err, pl) => (err + pl.type === 'error' ? 1 : 0), 0);
  if (warnings > 0) {
    return {
      count: warnings,
      type: 'warning',
    };
  }
  return {
    count: 0,
  };
};

class AppActions {

  /* constructor() {
    this.generateActions('updateBuilds', 'fetchBuildsFailed');
  }*/

  updateTheme(name) {
    return name;
  }

  updateIssues(plansData) {
    return updateIssues(plansData);
  }

  fetchBuilds = () => dispatch => {
    dispatch();
    return monitorService.getPlansData()
      .then(plans => {
        console.warn('plans retrieved', plans.length);
        this.updateBuilds(plans);
        this.updateIssues(plans);
      })
      .catch(this.fetchBuildsFailed);
  }


  updateBuilds = builds => builds;

  fetchBuildsFailed = err => err;
}

export default alt.createActions(AppActions);
