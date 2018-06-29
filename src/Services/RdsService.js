import { rds } from '../Config/aws';

class RdsService {
    constructor(credentials) {
        this.credentials = credentials;
    }

    _handleSuccess(data) {
        return data['DBInstances'].map((instance) => {
            return {
                DBInstanceClass: instance['DBInstanceClass'],
                Engine: instance['Engine'],
                State: instance['DBInstanceStatus'] === 'available' ? 'running' : 'stopped' 
            }
        });
    }

    _handleError() {

    }

    getInstances() {
        const request = rds.describeDBInstances();
        return request.promise().then(
            this._handleSuccess,
            this._handleError
        );
    }
}

export default RdsService