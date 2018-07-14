import moment from 'moment-timezone';
import config from '../Config/config';

import { CronJob } from 'cron';
import { connect } from "../Config/database.js";

import RdsService from '../Services/RdsService';
import Ec2Service from '../Services/Ec2Service';
import ElasticacheService from '../Services/ElasticacheService';

import History from '../Models/History';
console.log(config);
connect(config['database']);

const rdsService = new RdsService(config.aws);
const ec2Service = new Ec2Service(config.aws);
const elasticacheService = new ElasticacheService(config.aws);

function success(resource) {
  console.log(`Save ${resource} at ${moment().format()}`);
}

function error(resource, error) {
  console.log(`Error ${resource} at ${moment().format()}: ${error}`);
  process.exit();
}

function saveEcache() {
  const resource = 'ECACHE';
  elasticacheService.getInstances()
          .then((instances) => {
            History.create({state: JSON.stringify(instances), resource: resource})
                    .then((_doc) => { success(resource) } )
                    .catch((e) => { error(resource, e); });
          })
}

function saveRds() {
  const resource = 'RDS';
  rdsService.getInstances()
          .then((instances) => {
            History.create({state: JSON.stringify(instances), resource: resource})
                    .then((_doc) => { success(resource) } )
                    .catch((e) => { error(resource, e); });
          });
}

function saveEc2() {
  const resource = 'EC2';
  ec2Service.getInstances()
          .then((instances) => {
            console.log('hai');
            History.create({state: JSON.stringify(instances), resource: resource})
                    .then((_doc) => success(resource))
                    .catch((e) => error(resource, e));
          });
}

var job = new CronJob({
  cronTime: config.cron.time,
  onTick: function() {
    console.log(`Take snapshot at ${moment().tz(config.cron.timezone).format()}`)
    saveEc2();
    saveRds();
    saveEcache();
  },
  start: false,
  timeZone: config.cron.timezone
});

console.log(`Start cron at ${moment().tz(config.cron.timezone).format()}`)
job.start();