/*
 * Serve JSON to our AngularJS client
 */
var CsvStore = require('../models').CsvStore;
var JsonStore = require('../models').JsonStore;
var Product = require('../models').Product;
var mapjs = require('./map.js');
var map2js = require('./map2.js');
var local = require("../config/local");
var fs = require('fs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);
var request = require('request');

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.ruleGenerate = function(req, res){
	var list = req.body.list;
	// create rule to database
};

exports.csvNumber = function(req, res){
  
};

exports.csvToJson = function(req, res){
  var csvurl = req.body.csvurl;
  request(csvurl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body); // Show the csv. 
      //var data = body;//.replace("/客/g", "").replace("/品/g", "");
      //console.log(JSON.stringify(body));
      var string = JSON.stringify(body).replace(/客/g, "").replace(/品/g, "").replace(/"/g, "");
      //console.log(string);
      var split = string.split('\\r\\n');
      var i;
      var array = [];
      for(i = 0; i < split.length; i++){
        var comma = split[i].split(' ');
        var shoppingList = [];
        var j;
        for(j = 0; j < comma.length; j++){
          var productJson = {};
          productJson = {
            "PID": comma[j],
            "Amount": 1
          };
          shoppingList.push(productJson);
        }
        var jsonObject = {
          SID: 0,
          CID: 9,
          ShoppingList: shoppingList,
          Time: "2015-06-26 00:00:00"
        };
        array.push(jsonObject);
      }
      res.json(array);
      var filepath = "./9";
      var rules = mapjs.createRules(array);
      console.log(rules);
      fs.open(filepath, 'a', function(err, fd) {
        console.log('open')
        fs.close(fd, function(){});
      });
      fs.readFile(filepath, function (err, data) {
        if (err) throw err;
        console.log(data.length);
        var oldcontent=[];
        if(data.length != 0 ) oldcontent = JSON.parse(data.toString());
        var newcontent = JSON.stringify(oldcontent.concat(rules));
        fs.writeFile(filepath, newcontent, function (err) {
          if (err) throw err;
          console.log("It\'s saved!");
        });
      });
    }
  })
};

exports.checkLogin = function(req, res, next){
  var isLogin = false;
  if( _.has(req.session, 'isLogin') ){
    isLogin = req.session.isLogin;
  }
  if(isLogin){
    next();
  }else{
    res.status(401).json({error:true,msg:"請登入"});
  }
};

exports.getAllCsv = function(req, res){
    CsvStore.sync().then(function() {
    // here comes your find command.
      CsvStore
          .findAll().then(function(result){
            console.log('retrieve success');
            res.json(result);
          })
      })
};

exports.saveCsv = function(req, res){
    CsvStore.sync().then(function() {
    // here comes your find command.
      CsvStore
      .build(req.body)
      .save()
      .then(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        console.log('Created an csv file');
        //res.send("respond with a resource");
        res.json(anotherTask);
      }).catch(function(error) {
        // Ooops, do some error-handling
        console.log(error);
      })
  })
};


exports.getJson = function(req, res){
    JsonStore.sync().then(function() {
    // here comes your find command.
      JsonStore
          .find({
            where: {
              jsonid: req.params.jsonid
            }
          }).then(function(result){
            console.log('retrieve success');
            res.json(result);
          })
      })
};

exports.saveJson = function(req, res){
    JsonStore.sync().then(function() {
    // here comes your find command.
      JsonStore
      .build(req.body)
      .save()
      .then(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        console.log('Created an json file');
        //res.send("respond with a resource");
        res.json({
          msg: "Success"
        });
      }).catch(function(error) {
        // Ooops, do some error-handling
        console.log(error);
      })
  })
};


exports.search = function(req, res){
  var searchtext = "%"+req.params.searchtext+"%";
  var query = {
    pname: searchtext
  };
  Product.findAll(query).then(function(results){
    res.json(results);
  });
}