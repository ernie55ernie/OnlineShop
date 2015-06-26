var User = require('../models').User;
var Customer = require('../models').Customer;
var Group = require('../models').Group;
var GroupRelationShip = require('../models').GroupRelationShip;
var _ = require('underscore');

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
  console.log(query);
  User.sync().then(function() {
    // here comes your find command.
      User.find(query).then(function(result){
            //console.log(result);
            if(result){
              var uid = _.omit(result.dataValues,'username', 'password', 'createdAt', 'updatedAt', 'admin');
              //console.log(uid);
              Customer.sync().then(function() {
              // here comes your find command.
                Customer.find({
                  where: uid
                }).then(function(customer){
                      //console.log(customer);
                      req.session.user = customer;
                      req.session.isLogin = true;
                      res.json({msg:"Login success! Welcome " + customer.cusername});
                    })
               });
              
            }
            else{
              // res.end("fail");
              res.json({msg:"No user!"});
            }
          })
      })

};

exports.getCustomers = function(req, res){
   Customer.sync().then(function() {
    // here comes your find command.
      Customer.findAll().then(function(result){
            res.json(result);
          })
      })
};

exports.getCustomer = function(req, res){
   Customer.sync().then(function() {
    // here comes your find command.
      Customer.find({
        where: {
          uid: req.params.uid
        }
      }).then(function(result){
            res.json(result);
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
      User.find({
      	where: {
      		uid: req.params.uid
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
	var uid = 0
	User.sync().then(function() {
    // here comes your find command.
      User
      .build(user)
      .save()
      .then(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        //res.send("respond with a resource");
        //res.json(anotherTask);
	    var customer = {
			cusername: req.body.username,
			cgender: req.body.gender,
			cbirthday: req.body.birthday,
			caccount: anotherTask.dataValues.uid,
			cphoto: req.body.photo
		}
		Customer.sync().then(function() {
	    // here comes your find command.
	      Customer
	      .build(customer)
	      .save()
	      .then(function(anotherTask) {
	        // you can now access the currently saved task with the variable anotherTask... nice!
	        //res.send("respond with a resource");
	        res.json(anotherTask);
	      }).catch(function(error) {
	        // Ooops, do some error-handling
	        console.log(error);
	      })
	  	})
      }).catch(function(error) {
        // Ooops, do some error-handling
        console.log(error);
      })
  	})
}

exports.deleteUser = function(req, res){
    var uid = req.params.uid;
    User.destroy({where: {uid: uid}}).then(function(){
        res.json({ message: 'User removed!' });
    }).catch(function(err){
        console.log(err);
    })
    Customer.destroy({where: {caccount: uid}}).then(function(){
        res.json({ message: 'Customer removed!' });
    }).catch(function(err){
        console.log(err);
    })

};