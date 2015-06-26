/*
 * Serve JSON to our AngularJS client
 */
var CsvStore = require('../models').CsvStore;

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.ruleGenerate = function(req, res){
	var list = req.body.list;
	// create rule to database
};

exports.csvNumver = function(req, res){
  
};

exports.csvToJson = function(req, res){

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