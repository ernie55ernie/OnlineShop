/*
 * Serve JSON to our AngularJS client
 */
var csvstore = require('../models').CsvStore;
var local = require("../config/local");
var user = require('../models').User;
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

exports.getAllCsv = function(req, res){
	csvstore.findAll({
        where: {
        }
    }).then(function(courses) {
        res.json(csvstore);
    }).catch(function(err){
        console.log(err);
    })
};