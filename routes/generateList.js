var _ = require('underscore');
var CartItem = require('../models').CartItem;
var History = require('../models').History;
var local = require("../config/local");
var mapjs = require('./map.js');
var map2js = require('./map2.js');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
        local.model.mysql.database,
        local.model.mysql.account,
        local.model.mysql.password,
        local.model.mysql.options
);
var fs = require('fs');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

exports.generateList = function(req, res){
    var products = req.body.products;   // products = {pid: 1, prob: 0.5}
    var total = req.body.total || 100;
    var CID = req.body.customer || 1;
    // var products = [{pid: 1, prob: 0.2}, {pid: 2, prob: 0.3}, {pid: 3, prob: 0.4}];
    // var total = 10;
    // var CID = 1;
    var lists = _.range(total).map(function () {
        var randomDateTime = randomDate(new Date(2014, 1, 1), new Date()).toMysqlFormat();
        return {'CID': CID, 'ShoppingList': new Array(), 'Time': randomDateTime};
    })
    for (var i in products){
      var occurtimes = Math.round(products[i].prob * total);
      var indexes=[];
      while(indexes.length < occurtimes) {
        var n = Math.floor(Math.random()*total);
        if (indexes.indexOf(n)==-1) indexes.push(n);
      }
      for(index in indexes){
        lists[indexes[index]].ShoppingList.push({'PID': products[i].pid, 'Amount': 1});
      }
    }

    // for(var i in lists){
    //     var history = {'htime': lists[i].Time, 'cid': lists[i].CID};
    //     var list = lists[i].ShoppingList;
    //         History
    //          .build(history)
    //          .save()
    //          .then(function(resHistory) {
    //             var hid = resHistory.dataValues.hid
    //             for(var j in list){
    //                 var cartitem = {
    //                     'hid': hid,
    //                     'pid': list[j].PID,
    //                     'cinumber': 1
    //                 };
    //                 // here comes your find command.
    //                   CartItem
    //                   .build(cartitem)
    //                   .save()
    //                   .then(function(resCartItem) {
    //                     // you can now access the currently saved task with the variable anotherTask... nice!
    //                   }).catch(function(error) {
    //                     // Ooops, do some error-handling
    //                     console.log(error);
    //                   })
    //             }
    //       }).catch(function(error) {
    //         // Ooops, do some error-handling
    //         console.log(error);
    //       })
    // }

    res.json(lists);
    var filepath = "./"+CID;
    var rules = mapjs.createRules(lists);
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

exports.recommend = function(req,res){

  console.log(req.params);
  var uid = req.params.uid;
  var filepath = './' + uid;
  var result;
  console.log(uid);
  fs.readFile(filepath, function (err, data) {
      if (err) throw err;
      var rule = JSON.parse(data.toString());
      console.log(rule);
      result = map2js.recommend(rule, uid);
      console.log(result);
      for(var i in result){
        var j = result[i].indexOf('-');
        result[i] = parseInt(result[i].substring(j + 1)) + Math.floor(Math.random() * 10)+ Math.floor(Math.random() * 20);
      }
      console.log(result);
      res.send(result);
  });
}