var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var redis = require('redis');

app.use(bodyParser.json());

 //Hand = require('/hands');

//connect to mongoose
 mongoose.connect("mongodb://localhost/week7db", { useMongoClient: true });

 var db =  mongoose.connection;

 //DB schema
 var handsSchema = mongoose.Schema({
   //_id: ObjectId,
   cards:[{
    _id  : false,
    rank :{type : String, required : true},
    suit :{type : String, required : true}

   }]

});

var cards = mongoose.model("hand", handsSchema);

//for root
app.get('/',function(req,res){
  res.send("Please use /hands");
});

//To get all the hands from DB including the ID
app.get('/hands',function(req,res){
  Hand.getHands(function(err, hands){
    if(err){
      throw err;
    }
    res.json(hands);
    console.log("statusCode: ", res.statusCode);
  });
});


var Hand = module.exports = mongoose.model('Hand',handsSchema);

//Get Hands
module.exports.getHands = function(callback, limit) {
 Hand.find(callback).limit(limit);
}

//Get Hands by Id
module.exports.getHandsById = function(id, callback) {
 Hand.findById(id, callback);
}


app.get('/hands/:_id',function(req,res){
  Hand.getHandsById(req.params._id,function(err, hand){
    if(err){
      throw err;
    }
    console.log("statusCode: ", res.statusCode);
    var Status_code = res.statusCode;
    //res.json(Status_code+os.EOL+hand);
    //res.json("Status Code is "+Status_code+"\n"+hand);
    //res.json(Status_code,hand);
    //res.status(Status_code).json(hand);
    res.json(hand);
    //res.json(res.statusCode, hand);
    //console.log("statusCode: ", res.statusCode);
  });
});

//Get Hands given the ID
app.get('/hands/:_id/cards',function(req,res){
  Hand.getHandsById(req.params._id,function(err, hand){
    if(err){
      throw err;
    }
    console.log("statusCode: ", res.statusCode);
    var Status_code = res.statusCode;
    //res.json(Status_code+os.EOL+hand);
    //res.json("Status Code is "+Status_code+"\n"+hand);
    //res.json(Status_code,hand);
    //res.status(Status_code).json(hand);
    res.json(hand.cards);
    //res.json(res.statusCode, hand);
    //console.log("statusCode: ", res.statusCode);
  });
});

//Add Hands
module.exports.addHands = function(hand, callback) {
 Hand.create(hand, callback);
}

//Post
app.post('/hands',function(req,res){
  var hand = req.body;
  Hand.addHands(hand, function(err, hand){
    if(err){
      throw err;
    }
    res.json(hand);
    console.log("statusCode: ", res.statusCode);
  });
});

app.listen(3000, function () {
  console.log('Running on port 3000...........!')
})

//Update the hands
module.exports.updateHands = function(id, hand, options, callback) {
  var query = {_id: id};
  var update = {
    cards: hand.cards
  }
 Hand.findOneAndUpdate(query, update, options, callback);
}

//PUT
app.put('/hands/:_id',function(req,res){
  var id = req.params._id;
  var hand = req.body;
  Hand.updateHands(id, hand, {}, function(err, hand){
    if(err){
      throw err;
    }
    res.json(hand);
    console.log("statusCode: ", res.statusCode);
  });
});
