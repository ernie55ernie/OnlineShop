/*
 * Serve JSON to our AngularJS client
 */
var CartItem = require('../models').CartItem;
var History = require('../models').History;
var Product = require('../models').Product;

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
	local.model.mysql.database,
	local.model.mysql.account,
	local.model.mysql.password,
	local.model.mysql.options
);

