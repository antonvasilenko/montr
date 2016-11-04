const isService = (plan) =>
  /-(service|gateway|worker|processor)/.test(plan.name);

const getCategory = (plan) => {
  if (plan && plan.name) {
    if (plan.name.indexOf('-npm-') >= 0) {
      return 'Modules';
    }
    if (isService(plan)) {
      return plan.name.indexOf('vc-') >= 0 ? 'VC Backend' : 'VEVE Backend';
    }
    if (plan.name.indexOf('-app') >= 0) {
      return plan.name.indexOf('vc-') >= 0 ? 'VC Frontend' : 'VEVE Frontend';
    }
    if ((/test/i).test(plan.name)) {
      return 'Tests';
    }
  }
  return 'Other';
};

const groupBuildPlans = (plans) => {
  const plansMap = {
    'VC Backend': [],
    'VEVE Backend': [],
    'VC Frontend': [],
    'VEVE Frontend': [],
    Modules: [],
    Tests: [],
    Other: [],
  };
  plans.forEach(plan => plansMap[getCategory(plan)].push(plan));
  return plansMap;
};

export default groupBuildPlans;
