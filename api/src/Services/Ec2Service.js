import { flatten } from 'lodash/array';
import { ec2 } from '../Config/aws';

class Ec2InstancesService {
    constructor(credentials) {
        this.credentials = credentials;
    }

    getInstances() {
        const request = ec2.describeInstances();
        return request.promise().then(
            this._handleSuccess,
            this._handleError
        );
    }

    _handleSuccess(data) {
        return flatten(data['Reservations'].map((reservation) => {
                    return reservation['Instances'].map((instance) => {
                        return {
                            Type: instance.InstanceType,
                            SubnetId: instance.SubnetId,
                            VpcId: instance.VpcId,
                            Tags: instance.Tags,
                            State: instance.State.Name,
                        }
                    })
                })
            );
    }

    _handleError(error) {
        return error;
    }
}

export default Ec2InstancesService;