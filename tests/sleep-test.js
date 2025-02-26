const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const UserRepository = require('../src/users-repository');
const userData  = require('../data/test-data');
const users = userData;
const Sleep = require('../src/Sleep');
const SleepRepository = require('../src/sleep-repository');
const sleepData  = require('../data/test-data-sleep');

describe('Sleep', () => {

  let userRepo, user1, sleepRepo, sleep1;

  beforeEach(() => {
    userRepo = new UserRepository(users);
    user1 = new User(userRepo.users[1]);
    sleepRepo = new SleepRepository(sleepData);
    sleep1 = new Sleep(sleepData);
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should get avg number of hours slept per day for a user', () => {
    expect(sleep1.getAvgSleepHours(1)).to.equal(7.7);
  });

  it('should get avg sleep quality per day for a user', () => {
    expect(sleep1.getAvgSleepQual(1)).to.equal(2.5);
  });

  it('should get how many hours slept for a particular date for a user', () => {
    expect(sleep1.getHoursSleptPerDay("2019/06/15", 1)).to.equal(6.1);
  });

  it('should get sleep quality for a particular date for a user', () => {
    expect(sleep1.getSleepQualPerDay("2019/06/15", 1)).to.equal(2.2);
  });

  it('should get hours slept each day over any given week for a user', () => {
    expect(sleep1.getHoursSleptPerDayPerWeek("2019/06/21", 1)).to.deep.equal([ 10.7, 9.6, 7.2, 9.3, 10.1, 9.4, 7.8 ]);
  });

  it('should get sleep quality each day over a given week for a user', () => {
    expect(sleep1.getSleepQualPerDayPerWeek("2019/06/21", 1)).to.deep.equal([ 1.2, 2.5, 3.4, 1.2, 2.4, 1.2, 4.2 ]);
  });
});
