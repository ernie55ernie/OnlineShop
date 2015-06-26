exports.generateList = function(req, res){
    // var products = req.body.products;   // products = {pid: 1, prob: 0.5}
    // var total = req.body.total || 100;
    // var customer = req.body.customer;
    var _ = require('underscore');
    var products = [{pid: 1, prob: 0.2}, {pid: 2, prob: 0.3}, {pid: 3, prob: 0.4}];
    var total = 10;
    var CID = 1;
    var list = _.range(total+1).map(function () { return {'CID': CID, 'ShoppingList': ''} })
    for (var i in products){
      var occurtimes = Math.round(products[i].prob * total);
      var indexes=[];
      while(indexes.length < occurtimes) {
        var n = Math.floor(Math.random()*total);
        if (indexes.indexOf(n)==-1) indexes.push(n);
      }
      for(index in indexes){
        list[indexes[index]].ShoppingList = list[indexes[index]].ShoppingList + products[i].pid + ' ';
      }
    }
    
    return list
}