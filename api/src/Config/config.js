const config = {
    'development': {
        'database': {
            'host': process.env.DATABASE_HOST,
            'port': process.env.DATABASE_PORT,
            'user': process.env.DATABASE_USER,
            'password': process.env.DATABASE_PASSWORD,
            'database': process.env.DATABASE_DATABASE
        },
        'aws': {
            'provider': 'aws',
            'awsSecretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
            'awsAccessKeyId': process.env.AWS_ACCESS_KEY_ID,
            'awsRegion': process.env.AWS_DEFAULT_REGION,
        },
        'cron': {
            'time': process.env.CRON_TIME,
            'timezone': 'America/Sao_Paulo'
        },
        'port': 3001,
        'contextRoot': '/api/v1/cloud-dashboard'
    },
    'production': {
        'port': 3001,
        'contextRoot': '/api/v1/cloud-dashboard'
    }
};

const env = process.env.NODE_ENV || 'development';
export default config[env];