import History from '../Models/History';
import HistoryFilter from '../Models/HistoryFilter';

class HistoriesController {
    static findAll(request, response) {
        const filter = new HistoryFilter(request.query);
        History.findBy(filter)
                    .then(data => {
                        response.status(200).send(data);
                    })
                    .catch(error => {
                        response.status(500).send({error});
                    })
    }    

    static create(request, response) {
        History.create(request.body)
                    .then(data => {
                        response.status(201).send({id: data.id});
                    })
                    .catch(error => {
                        response.status(500).send({error});
                    });
    }
};

export default HistoriesController;