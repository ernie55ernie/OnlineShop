
/*
 * GET home page.
 */

exports.index = function(req, res){
	var config = {};
    config.isLogin = false;//req.session.isLogin ? true : false;
    if(config.isLogin){
    	config.User = req.session.user;
        res.render('index', config);
    }
    else{
        config.User = false;
        res.render('index', config);
	}
	//res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};