const credentials = {
    provider: process.env.REACT_APP_PROVIDER,
    awsSecretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    awsAccessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    awsRegion: process.env.REACT_APP_AWS_DEFAULT_REGION,
}

export { credentials }