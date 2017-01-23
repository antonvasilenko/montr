import R from 'ramda';

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

const defaultPlansMap = {
  'VC Backend': [],
  'VEVE Backend': [],
  'VC Frontend': [],
  'VEVE Frontend': [],
  Modules: [],
  Tests: [],
  Other: [],
};

// const groupBuildPlansI = (plans) => {
//   const plansMap = { ...defaultPlansMap };
//   plans.forEach(plan => plansMap[getCategory(plan)].push(plan));
//   return plansMap;
// };

const groupBuildPlansF =
  R.reduce((acc, p) => acc[getCategory(p)].push(p), { ...defaultPlansMap });

const groupBuildPlans = plans =>
  R.tryCatch(groupBuildPlansF(plans), R.pipe(console.log, R.T));

export default groupBuildPlans;
