import { CronJob } from 'cron';
import { credentials } from '../Config';
import { mongo } from '../Config/mongo';
import moment from 'moment';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/dashboard`).then(
  () => { console.log('connected successfuly') },
  () => { 
    console.log('Error connection');
    process.exit();
  }
);

import CloudState from './Models/CloudState'

import RdsService from '../Services/RdsService';
import Ec2Service from '../Services/Ec2Service';
import EcacheService from '../Services/EcacheService';

const rdsService = new RdsService(credentials);
const ec2Service = new Ec2Service(credentials);
const ecacheService = new EcacheService(credentials);

function success(resource) {
  console.log(`Save ${resource} at ${moment().format()}`);
}
function error(resource, error) {
  console.log(`Error ${resource} at ${moment().format()}: ${error}`);
  process.exit();
}

function saveEcache() {
  const resource = 'ECACHE';
  ecacheService.getInstances()
          .then((instances) => {
            const state = new CloudState({state: JSON.stringify(instances), resource: resource})
            state.save()
                    .then((_doc) => { success(resource) } )
                    .catch((e) => { error(resource, e); });
          })
}

function saveRds() {
  const resource = 'RDS';
  rdsService.getInstances()
          .then((instances) => {
            const state = new CloudState({state: JSON.stringify(instances), resource: resource})
            state.save()
                    .then((_doc) => { success(resource) } )
                    .catch((e) => { error(resource, e); });
          });
}

function saveEc2() {
  const resource = 'EC2';
  ecacheService.getInstances()
          .then((instances) => {
            const state = new CloudState({state: JSON.stringify(instances), resource: resource})
            state.save()
                    .then((_doc) => { success(resource) } )
                    .catch((e) => { error(resource, e); });
          });
}

var job = new CronJob({
  cronTime: '30 * * * * *',
  onTick: function() {
    saveEc2();
    saveRds();
    saveEcache();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

job.start();