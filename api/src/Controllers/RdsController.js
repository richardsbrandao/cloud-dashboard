import RdsService from '../Services/RdsService';
import config from '../Config/config';

class RdsController {
    static current(request, response) {
        new RdsService(config.aws).getInstances()
                .then(instances => {
                    response.send(instances);
                });
    }
}

export default RdsController;