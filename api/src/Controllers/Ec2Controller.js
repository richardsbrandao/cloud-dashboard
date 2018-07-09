import Ec2Service from '../Services/Ec2Service';
import config from '../Config/config';

class Ec2Controller {
    static current(request, response) {
        new Ec2Service(config.aws).getInstances()
                .then(instances => {
                    response.send(instances);
                });
    }
}

export default Ec2Controller;