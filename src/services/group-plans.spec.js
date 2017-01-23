import { expect } from 'chai';
import groupPlans from './group-plans';

describe('group-plans', () => {
  let plans = null;
  beforeEach(() => {
    plans = [
      { name: 'vc-advisor-app' },
      { name: 'veve-user-convert-service' },
      { name: 'vc-customer-activity-app' },
      { name: 'veve-npm-logger' },
    ];
  });
  it('should group with no errors', () => {
    const res = groupPlans(plans);
    expect(res).to.be.an('object');
  });
});