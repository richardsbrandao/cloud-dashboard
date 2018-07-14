#!/bin/bash

echo 'SERVICE'
npm install
npm run build
docker build -t aws-dashboard-service .