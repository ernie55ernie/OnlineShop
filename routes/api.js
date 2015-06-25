/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.ruleGenerate = function(req, res){
	var list= req.body.list;

	// create rule to database
}