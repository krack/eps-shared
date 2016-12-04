var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var http = require('http');

var database = {
	url : 'mongodb://mongo:27017'
}

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// To be redesigned with a loop and a break on total timeout or number of tries
mongoose.connect(database.url, function(err) {
	if(err) {
		console.log('connection error (first try)', err);
		setTimeout(function() {
			mongoose.connect(database.url, function(err) {
				if(err) {
					console.log('connection error (second try)', err);
					setTimeout(function() {
						mongoose.connect(database.url, function(err) {
							if(err) {
								console.log('connection error (three strikes... you are out)', err);
							} else {
								console.log('successful connection (third try... almost out)');
							}
						});
					},5000);
				} else {
					console.log('successful connection (second try)');
				}
			});
		},1000);
	} else {
		console.log('successful connection (first try)');
	}
});

app.use(morgan('dev'));
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride('X-HTTP-Method-Override'));

var apiObject = {
	title: {type: String},
	describe: {type: String}
};

var baseApi = "/api/ads/"

var mongoose = require('mongoose');
var AdsModel = mongoose.model('Ad', apiObject);

function get(res){
	AdsModel.find(function(err, ads) {
		if (err)
			res.send(err)
		res.json(ads);
	});
};

function convert(object){
	object.href = baseApi+"/"+object._id;
	return object;
};

app.get(baseApi, function(req, res) {
	get(res);
});

app.get(baseApi+':id', function(req, res) {
	AdsModel.findById(req.params.id, function(err, ad) {
		if (err)
			res.send(err);
		res.json(convert(ad));
	});
});

app.delete(baseApi+':id', function(req, res) {
	AdsModel.findByIdAndRemove(req.params.id, function(err, ad) {
		if (err)
			res.send(err);
		res.send();
	});
});
app.post(baseApi, function(req, res) {
	var keys = Object.keys(apiObject);
	var data = {};
	for(var i = 0; i < keys.length; i++){
		data[keys[i]] = req.body[keys[i]];
	}
	AdsModel.create(data, function(err, ad) {
		if (err)
			res.send(err);
		get(res);
	});
});

app.listen(port);
console.log("App listening on port " + port);
