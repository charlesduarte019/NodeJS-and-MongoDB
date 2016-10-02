var mongodb = require('mongodb'),
// Get a Mongo client to work with the Mongo server
	MongoClient = mongodb.MongoClient,

// Define where the MongoDB server is
	url = 'mongodb://localhost:27017/collectionsi';

exports.add = function (res, jsonText) {

	// Connect to the server
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the Server', err);
		} else {
			// We are connected
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('collection');

	        // Insert the student data into the database
	        collection.insert(jsonText, function (err, result){
		        if (err) {
		        	console.log(err);
		        } else {
		        	if(result.result.ok == 1 && result.result.n != 0){
			        	res.write("<h2>Sucesso</h2>");
			       		res.write("<h2><a href='http://localhost:3000'>Voltar</a></h2>");
						res.write("<h2>Para listar:" +
									"<br/><a href='http://localhost:3000/find'>Listar Objetos</a>" +
									"</h2>");
		        	}else{
			       		res.write("<h2>Erro</h2>");
			       		res.write("<h2><a href='http://localhost:3000'>Voltar</a></h2>");	
		        	}
		       		console.log(result);
		        }

		        // Close the database
		        res.end();
		        db.close();
	        });
		}
	});
}

exports.remove = function (res, jsonText) {

	// Connect to the server
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the Server', err);
		} else {
			// We are connected
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('collection');

	        // Insert the student data into the database
	        collection.remove(jsonText, function (err, result){
		        if (err) {
		        	console.log(err);
		        } else {
		        	if(result.result.ok == 1 && result.result.n != 0){
						res.write("<h2>Sucesso</h2>");
						res.write("<h2><a href='http://localhost:3000'>Voltar</a></h2>");
						res.write("<h2>Para listar:" +
									"<br/><a href='http://localhost:3000/find'>Listar Objetos</a>" +
									"</h2>");
		        	}else{
			       		res.write("<h2>Erro</h2>");
			       		res.write("<h2><a href='http://localhost:3000'>Voltar</a></h2>");	
		        	}
		       		console.log(result);
		        }

		        // Close the database
		        res.end();
		        db.close();
	        });
		}
	});
}

exports.find = function (res) {

	// Connect to the server
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the Server', err);
		} else {
			// We are connected
			console.log('Connection established to', url);
			// Get the documents collection
			var collection = db.collection('collection');
			// Find all students
			collection.find().toArray(function (err, result) {
				if (err) {
					res.write(err);
					res.send(err);
				} else if (result.length) {
					res.write("<h2>" + JSON.stringify(result) + "</h2>");
					res.write("<h2><a href='http://localhost:3000'>Voltar</a></h2>");
					console.log(result);
				} else {
					res.write("<h2>Sem arquivo de documentos</h2>");
				}
				//Close connection
				res.end();
				db.close();
			});
		}
	});
}