var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);
var CartItem = require("./CartItem").CartItem(Sequelize,sequelize);
var Category = require("./Category").Category(Sequelize,sequelize);
var CsvStore = require("./CsvStore").CsvStore(Sequelize,sequelize);
var Customer = require("./Customer").Customer(Sequelize,sequelize);
var Group = require("./Group").Group(Sequelize,sequelize);
var GroupRelationShip = require("./GroupRelationShip").GroupRelationShip(Sequelize,sequelize);
var History = require("./History").History(Sequelize,sequelize);
var Product = require("./Product").Product(Sequelize,sequelize);
var User = require("./User").User(Sequelize, sequelize);
var JsonStore = require('./JsonStore').JsonStore(Sequelize,sequelize);
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