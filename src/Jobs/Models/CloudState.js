import mongoose from 'mongoose';

const Schema = mongoose.Schema

const CloudStateSchema = new Schema({
	state: {type: String, required: true},
	resource: {type: String, required: true},
	time: {type: Date, default: Date.now},
}, {collection: 'cloud_state'});

const CloudState = mongoose.model('CloudState', CloudStateSchema);

export default CloudState;