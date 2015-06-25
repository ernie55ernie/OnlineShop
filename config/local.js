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
			database: "a4050679_shop",
			account : "a4050679_shop",
			password: "shop1shop",
			options : {
				host    : "mysql8.000webhost.com",
				logging : false
			}
		},
		mongo : {
			database: "",
			options : {
				host: ""
			}
		}
	},

	session: {
		redis: {
			host: 'ck6tp6m4-dm_final-1566920',
			port: 6379
		}
    }

}