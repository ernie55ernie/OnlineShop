/*
 * Serve JSON to our AngularJS client
 */
var Product = require('../models').Product;
var Category = require('../models').Category;

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);

exports.getProducts = function(req, res){
	Product.sync().then(function(){
		Product.findAll().then(function(result){
			res.json(result);
		})
	})
}

exports.getProduct = function(req, res){
	Product.sync().then(function(){
		Product.find({
			where: {
				pid: req.pid
			}
		}).then(function(result){
			res.json(result);
		})
	})
}

exports.createProduct = function(req, res){
	var product = req.body;
	Product.sync().then(function(){
		Product
		.build(product)
		.save()
		.then(function(anotherTask){
			res.json(anotherTask);
		})
	})
}

exports.deleteProduct = function(req, res){
	var pid = req.params.pid;
	Product.destroy({
		where: {
			pid: pid
		}
	}).then(function(){
		res.json({message: 'Product removed'})
	}).catch(function(err){
		console.log(err);
	})
}

exports.getCategories = function(req, res){
	Category.sync().then(function(){
		Category.findAll().then(function(result){
			res.json(result);
		})
	})
}

exports.getCategory = function(req, res){
	Category.sync().then(function(){
		Category.find({
			where: {
				caid: req.params.caid
			}
		}).then(function(result){
			res.json(result);
		})
	})
}

exports.createCategory = function(req, res){
	var category = req.body;
	Category.sync().then(function(){
		Category
		.build(category)
		.save()
		.then(function(anotherTask){
			res.json(anotherTask);
		})
	})
}

exports.deleteCategory = function(req, res){
	var caid = req.params.caid;
	Category.destroy({
		where: {
			caid: caid
		}
	}).then(function(){
		res.json({message: 'Category removed'})
	}).catch(function(err){
		console.log(err);
	})
}