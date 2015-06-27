var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);
var CartItem = require("./cartitem").CartItem(Sequelize,sequelize);
var Category = require("./category").Category(Sequelize,sequelize);
var CsvStore = require("./csvstore").CsvStore(Sequelize,sequelize);
var Customer = require("./customer").Customer(Sequelize,sequelize);
var Group = require("./group").Group(Sequelize,sequelize);
var GroupRelationShip = require("./grouprelationship").GroupRelationShip(Sequelize,sequelize);
var History = require("./history").History(Sequelize,sequelize);
var Product = require("./product").Product(Sequelize,sequelize);
var User = require("./user").User(Sequelize, sequelize);
var JsonStore = require('./jsonstore').JsonStore(Sequelize,sequelize);
exports.CartItem = CartItem;
exports.Category = Category;
exports.CsvStore = CsvStore;
exports.Customer = Customer;
exports.Group = Group;
exports.GroupRelationShip = GroupRelationShip;
exports.History = History;
exports.Product = Product;
exports.User = User;
exports.JsonStore = JsonStore;