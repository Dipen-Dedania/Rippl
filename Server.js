var express=require('express');
var app=express();
app.use(express.static(__dirname + '/Public'));
var mongodb = require('mongodb');

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendFile(__dirname + '/Index.html');
});

app.get('/send',function(req,res){
	var mailOptions={
		to : req.query.to,
		subject : req.query.subject,
		text : req.query.text
	};
	var MongoClient = mongodb.MongoClient;

	// Connection URL. This is where your mongodb server is running.
	var url = 'mongodb://localhost:27017/rippl';

	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			var date = new Date();
			var collection = db.collection('user');
			var user = {email: req.query.to, timestamp : date};
			collection.insert(user, function (err, result) {
				if (err) {
					res.end("error");
				} else {
					res.end("sent");
				}
				//Close connection
				db.close();
			});
		}
	});
});

/*--------------------Routing Over----------------------------*/

app.listen(80,function(){
	console.log("Express Started on Port 3000");
});