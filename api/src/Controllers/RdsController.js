import moment from 'moment-timezone';

import RdsService from '../Services/RdsService';
import config from '../Config/config';
import History from '../Models/History';

class RdsController {
    static current(request, response) {
        new RdsService(config.aws).getInstances()
                .then(instances => {
                    response.send([new History('RDS', instances, moment().tz(config.cron.timezone).toDate())]);
                });
    }
}

export default RdsController;