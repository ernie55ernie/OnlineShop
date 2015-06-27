/*
 * Serve JSON to our AngularJS client
 */
var CartItem = require('../models').CartItem;
var History = require('../models').History;
var Product = require('../models').Product;
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
	local.model.mysql.database,
	local.model.mysql.account,
	local.model.mysql.password,
	local.model.mysql.options
);

exports.getHistories = function(req, res){
	History.sync().then(function(){
		History.findAll().then(function(result){
			res.json(result);
		})
	})
}

exports.getHistory = function(req, res){
	History.sync().then(function(){
		History.find({
			where: {
				pid: req.pid
			}
		}).then(function(result){
			res.json(result);
		})
	})
}

exports.createHistory = function(req, res){
	var product = req.body;
	History.sync().then(function(){
		History
		.build(product)
		.save()
		.then(function(anotherTask){
			res.json(anotherTask);
		})
	})
}

exports.deleteHistory = function(req, res){
	var pid = req.params.pid;
	History.destroy({
		where: {
			pid: pid
		}
	}).then(function(){
		res.json({message: 'History removed'})
	}).catch(function(err){
		console.log(err);
	})
}

