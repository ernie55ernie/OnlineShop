// hostname: ck6tp6m4-dm_final-1566920
// port: 3306
// username: ck6tp6m4
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
			database: "",
			account : "ck6tp6m4",
			password: "",
			options : {
				host    : "ck6tp6m4-dm_final-1566920",
				logging : false
			}
		},
		mongo : {
			database: "SDM",
			options : {
				host: "127.0.0.1"
			}
		}
	},

	session: {
		redis: {
			host: 'localhost',
			port: 6379
		}
    }

}