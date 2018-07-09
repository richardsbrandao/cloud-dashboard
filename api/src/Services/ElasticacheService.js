import { elastiCache } from '../Config/aws';

class ElasticacheService {
    constructor(credentials) {
        this.credentials = credentials;
    }

    _handleSuccess(data) {
        return data['CacheClusters'].map((instance) => {
            return {
                    CacheNodeType: instance['CacheNodeType'],
                    Engine: instance['Engine'],
                    State: instance['CacheClusterStatus'] === 'available' ? 'running' : 'stopped' 
            };
        });
    }

    getInstances() {
        const request = elastiCache.describeCacheClusters();
        return request.promise().then(
            this._handleSuccess,
            this._handleError
        );
    }
    
}

export default ElasticacheService;