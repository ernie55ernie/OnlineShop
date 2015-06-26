var User = require('../models').User;
var Customer = require('../models').Customer;

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);

exports.login = function(req, res){
  var query = {
    where:{
      username: req.body.username,
      password: req.body.password
    }
  }
  User.sync().then(function() {
    // here comes your find command.
      User.find(query).then(function(result){
            if(result){
              res.end("fail");
              res.json({msg:"No user!"});
            }
            else{
              var user = _.omit(result.dataValues, 'password', 'createdAt', 'updatedAt');
              req.session.user = user;
              req.session.isLogin = true;
              res.json({msg:"success"});
            }
          })
      })

};

exports.getUsers = function(req, res){
	 User.sync().then(function() {
    // here comes your find command.
      User.findAll({
      	attributes: ['uid', 'username']
      }).then(function(result){
            res.json(result);
          })
      })
};

exports.getUser = function(req, res){
	 User.sync().then(function() {
    // here comes your find command.
      User.findAll({
      	where: {
      		username: req.params.username
      	},
      	attributes: ['uid', 'username']
      }).then(function(result){
            res.json(result);
          })
      })
};

exports.createUser = function(req, res){
	var user = {
		username: req.body.username,
		password: req.body.password
	}
	User.sync().success(function() {
    // here comes your find command.
      User
      .build(user)
      .save()
      .success(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        //res.send("respond with a resource");
        //res.json(anotherTask);
      }).error(function(error) {
        // Ooops, do some error-handling
        console.log(error);
      })
  	})

	var customer = {
		cusername: req.body.username,
		cgender: req.body.gender,
		cbirthday: req.body.birthday,
		caccount: getUser(req.body.username).uid,
		cphoto: req.body.photo
	}
	Customer.sync().success(function() {
    // here comes your find command.
      Customer
      .build(customer)
      .save()
      .success(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        //res.send("respond with a resource");
        //res.json(anotherTask);
      }).error(function(error) {
        // Ooops, do some error-handling
        console.log(error);
      })
  	})
}