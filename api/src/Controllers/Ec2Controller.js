import moment from 'moment-timezone';

import Ec2Service from '../Services/Ec2Service';
import config from '../Config/config';
import History from '../Models/History';

class Ec2Controller {
    static current(request, response) {
        new Ec2Service(config.aws).getInstances()
                .then(instances => {
                    response.send([new History('EC2', instances, moment().tz(config.cron.timezone).toDate())]);
                });
    }
}

export default Ec2Controller;