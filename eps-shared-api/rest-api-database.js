

module.exports = function init(config, modelStructure, app, storageClient) {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var multer = require('multer');
	var uuid = require('uuid/v4');
	var fs = require('fs');

	var filesApi = [];

	var shemaConfiguration = extractShema(modelStructure);


	var model = mongoose.model(config.shema, shemaConfiguration);

	//GET /
	app.get(config.baseApi, function(req, res) {
		get(res);
	});

	//GET /:id
	app.get(config.baseApi+':id', function(req, res) {

		model.findById(req.params.id, function(err, object) {
			if (!object)
				res.status(404).send("not found");
			else if(err){
				res.status(500).send(err);

			}
			else
				res.json(convert(object));
		});
	});

	//DELETE /:id
	app.delete(config.baseApi+':id', function(req, res) {
		model.findByIdAndRemove(req.params.id, function(err, object) {
			if (!object)
				res.status(404).send(err);
			else
				res.send();
		});
	});

	//POST /
	app.post(config.baseApi, function(req, res) {
		console.log(shemaConfiguration)
		var keys = Object.keys(shemaConfiguration);
		var data = updateObject({}, req.body);
		model.create(data, function(err, object) {
			if (err)
				res.send(err);
			res.json(object);
		});
	});


	//PUT /:id
	app.put(config.baseApi+':id', function(req, res) {
		var keys = Object.keys(shemaConfiguration);
		
		model.findById(req.params.id, function(err, object) {
			
			if (!object)
				res.status(404).send(err);
			else {
				var keys = Object.keys(req.body);
				var data = updateObject(object, req.body);
				data.save(function(err) {
					res.json(data);
				});
			 }
		});
	});

	for(var i = 0; i < filesApi.length; i++){
		registerSubFieldFile(filesApi[i]);
	}



	function extractShema(modelStructure){
		var shemaConfiguration = {};
		for(var i = 0; i < modelStructure.length; i++){
			var structure = modelStructure[i];
			if(structure.type === "String"){
				shemaConfiguration[structure.name] = structure.type;
			}else if(structure.type === "Files"){
				shemaConfiguration[structure.name] = [{ _id: 'string',  href: 'string'}];
				filesApi.push(structure);
			}else if(structure.type === "Object"){
				shemaConfiguration[structure.name] = extractShema(structure.shema);
			}else{
				console.error("not managed type")
			}
		}
		return shemaConfiguration;
	}

	function get(res){
		model.find(function(err, ads) {
			if (err)
				res.send(err)
			res.json(ads);
		});
	};



	function updateObject(objet1, object2) {
		var keys = Object.keys(object2);
		for(var i = 0; i < keys.length; i++){
			objet1[keys[i]] = object2[keys[i]];
		}		
		return objet1;
	}

	function convert(object){
		if(object)
			object.href = config.baseApi+"/"+object._id;
		return object;
	};

	function registerSubFieldFile(truc){
		var name = truc.name;
		var storageContainer = truc.container;

		//POST /:id/name/
		app.post(config.baseApi+':id/'+name+'/', function(req, res) {
			model.findById(req.params.id, function(err, object) {
				if (!object)
					res.status(404).send("not found");
				else if(err){
					res.status(500).send(err);

				}
				else{
					 upload(req,res,function(err){
						if(err){
			             	res.json({error_code:1,err_desc:err});
			             	return;
						}


						var fileId = req.file.filename;

						var readStream = fs.createReadStream(req.file.path);
						var writeStream = storageClient.upload({
							container: storageContainer,
							remote: fileId
						});

						writeStream.on('error', function(err) {
							 console.log('upload failed:', err);
						});

						writeStream.on('success', function(file) {
							object[name].push({
							 	"_id" : fileId,
							 	"href" : config.serverHost+":"+config.port+config.baseApi+req.params.id+'/'+name+'/'+fileId
							 });
							object.save(function(err) {
					        		res.json({error_code:0,err_desc:null});
							});
						});

						readStream.pipe(writeStream);

					});

				}
			});
		   

		});
		//GET /:id/name/:fileId
		app.get(config.baseApi+':id/'+name+'/:fileId', function(req, res) {
			model.findById(req.params.id, function(err, object) {
				if (!object)
					res.status(404).send("not found");
				else if(err){
					res.status(500).send(err);
				}
				else{
					var fileId = req.params.fileId;

					var download= storageClient.download({
						container: storageContainer,
						remote: fileId
					});

					download.pipe(fs.createWriteStream('/tmp/'+fileId));   	
					download.on('end', function() {
						res.sendFile("/tmp/"+fileId);
		 			});
		 			download.on('error', function() {
		 				console.log("erroooooooooooooooooor");
						res.sendFile("/tmp/"+fileId);
		 			});		
		   		}
		   	});

		});
	}

	var storage = multer.diskStorage({ //multers disk storage settings

		destination: function (req, file, cb) {

		    cb(null, '/tmp/');

		},

		filename: function (req, file, cb) {

		    var name = uuid(); 

		    cb(null, name);

		}

	});



	var upload = multer({ //multer settings

		storage: storage

	}).single('file');
};