'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	LegoSchema = new Schema({
	number: String,
	model: String,
	legoSet: String,
	amount: Number,
	imageURL: String
});

module.exports = mongoose.model('Lego', LegoSchema);

/*
{
	number: "L0001",
	model: "A0001",
	legoSet: "Architecture",
	amount: 100,
	imageURL: "..."
}

db.legosdb.insert({
	number: "L0001",
	model: "A0001",
	legoSet: "Architecture",
	amount: 100,
	imageURL: "..."
})
*/