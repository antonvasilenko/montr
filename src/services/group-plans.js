const getCategory = (plan) => {
  if (plan && plan.name) {
    if (plan.name.indexOf('-service') > 0
      || plan.name.indexOf('processor') > 0) {
      return 'Backend';
    }
    if (plan.name.indexOf('-app') > 0) {
      return 'Frontend';
    }
    if (plan.name.indexOf('-npm-') > 0) {
      return 'Modules';
    }
    if ((/test/i).test(plan.name)) {
      return 'Tests';
    }
  }
  return 'Other';
};

const groupBuildPlans = (plans) => {
  const plansMap = {
    Backend: [],
    Frontend: [],
    Modules: [],
    Tests: [],
    Other: [],
  };
  plans.forEach(plan => plansMap[getCategory(plan)].push(plan));
  return plansMap;
};

export default groupBuildPlans;
