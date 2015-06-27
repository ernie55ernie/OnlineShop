var _ = require('underscore');
var CartItem = require('../models').CartItem;
var History = require('../models').History;
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
        local.model.mysql.database,
        local.model.mysql.account,
        local.model.mysql.password,
        local.model.mysql.options
);

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

    for(var i in lists){
        var history = {'htime': lists[i].Time, 'cid': lists[i].CID};
        // console.log(history);
        var list = lists[i].ShoppingList;
        // console.log(list);
        // History.sync().then(function() {
            // console.log(history);
            History
             .build(history)
             .save()
             .then(function(resHistory) {
                // console.log('here');
                // console.log(resHistory.dataValues);
                var hid = resHistory.dataValues.hid
                for(var j in list){
                    var cartitem = {
                        'hid': hid,
                        'pid': list[j].PID,
                        'cinumber': 1
                    };
                    // console.log(cartitem);
                    // CartItem.sync().then(function() {
                    // here comes your find command.
                    // console.log(cartitem);
                      CartItem
                      .build(cartitem)
                      .save()
                      .then(function(resCartItem) {
                        // you can now access the currently saved task with the variable anotherTask... nice!
                        //res.send("respond with a resource");
                        // res.json(resHistory);
                      }).catch(function(error) {
                        // Ooops, do some error-handling
                        console.log(error);
                      })
                    // })
                }
          }).catch(function(error) {
            // Ooops, do some error-handling
            console.log(error);
          })
        // })
    }

    // console.log(lists);


    res.json(lists);
}