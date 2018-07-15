import moment from 'moment-timezone';

import ElasticacheService from '../Services/ElasticacheService';
import config from '../Config/config';
import History from '../Models/History';

class ElasticacheController {
    static current(request, response) {
        new ElasticacheService(config.aws).getInstances()
            .then(instances => {
                response.send([new History('ECACHE', instances, moment().tz(config.cron.timezone).toDate())]);
            });
    }
}

export default ElasticacheController;