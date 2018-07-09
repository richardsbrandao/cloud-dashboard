import HistoryController from "../Controllers/HistoriesController";
import Ec2Controller from '../Controllers/Ec2Controller';
import RdsController from '../Controllers/RdsController';
import ElasticacheController from '../Controllers/ElasticacheController';

import express from "express";
const router = express.Router();

export default function () {
    router.post('/histories', (request, response) => {
        HistoryController.create(request, response);
    });
    router.get('/histories', (request, response) => {
        HistoryController.findAll(request, response);
    });

    router.get('/ec2', (request, response) => {
        Ec2Controller.current(request, response);
    });

    router.get('/rds', (request, response) => {
        RdsController.current(request, response);
    });

    router.get('/elasticache', (request, response) => {
        ElasticacheController.current(request, response);
    });
    return router;
}