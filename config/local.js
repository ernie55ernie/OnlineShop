// hostname: ck6tp6m4-dm_final-1566920
// port: 3306
// username: ck6tp6m4
/*
$mysql_host = "mysql8.000webhost.com";
$mysql_database = "a4050679_shop";
$mysql_user = "a4050679_shop";
$mysql_password = "shop1shop";
*/

var sslEnabled = false;
var path  = require('path');

module.exports = {
	
	enviroment: "development",

	port : (process.env.PORT || 3000),

	middleware: {
		view_cache : false,
		logger_dev : true,
		less      : false
	}, 

	model: {
		mysql : {
			database: "sql681800",
			account : "sql681800",
			password: "nE4*wG1*",
			options : {
				host    : "sql6.freesqldatabase.com",
				logging : false
			}
		},
		mongo : {
			database: "shoppingprobability",
			options : {
				host: "ds045882.mongolab.com:45882",
				username: "adminshopping",
				password: "shoppingadmin"
			}
		}
	},

	session: {
		redis: {
			host: 'pub-memcache-11842.us-east-1-1.2.ec2.garantiadata.com',
			port: 11842,
			pass: "adminshopping"
			// host: 'localhost',
			// port: 6379
		}
    },

    apikey: {
    	filepicker: "AfDUcO2yfT4yVBX9p2t4Xz"
    }

}