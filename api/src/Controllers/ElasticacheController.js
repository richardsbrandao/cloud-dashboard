import ElasticacheService from '../Services/ElasticacheService';
import config from '../Config/config';

class ElasticacheController {
    static current(request, response) {
        new ElasticacheService(config.aws).getInstances()
            .then(instances => {
                response.send(instances);
            });
    }
}

export default ElasticacheController;