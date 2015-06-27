
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  generateList = require('./routes/generateList'),
  http = require('http'),
  path = require('path'),
  session = require('express-session'),
  passport = require('passport'),
  //DigestStrategy = require('passport-http').DigestStrategy,
  _ = require('underscore'),
  MongoClient = require('mongodb').MongoClient, 
  assert = require('assert');

var local = require('./config/local'),
    api = require('./routes/api'),
    user = require('./routes/user'),
    product = require('./routes/product');

var app = module.exports = express();

/*passport.serializeUser(function(user, done) {
  // console.log(user);
  done(null, user);
  });

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new DigestStrategy({ qop: 'auth' },
  function(username, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, user.password);
    });
  },
  function(params, done) {
    // validate nonces as necessary
    done(null, true)
  }
));*/
/*MongoClient.connect(local.model.mongo.url, function(err, db) {
  //assert.equal(null, err);
  //console.log("Connected correctly to server");
  console.log(err);
  db.close();
});*/

app.use(session({
  secret: "idontknow",
  cookie: {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    maxAge: 30 * 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: false,
  proxy: false,
  cookie: { secure: true }
}));

/**
 * Configuration
 */
// all environments
function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  var origin = req.headers.origin;
  if (_.contains(app.get('allowed_origins'), origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);
app.get('/api/csv', api.getAllCsv);
app.post('/api/savecsv', api.saveCsv);
app.get('/api/csvnumber', api.csvNumber);
app.post('/api/csvtojson', api.csvToJson);

// Product
app.get('/getproduct/:pid', product.getProduct);
app.get('/getproducts', product.getProducts);
app.post('/createproduct', product.createProduct);
app.get('/deleteproduct/:pid', product.deleteProduct);
app.get('/getcategory/:caid', product.getCategory);
app.get('/getcategories', product.getCategories);
app.post('/createcategory', product.createCategory);
app.get('/deletecategory/:caid', product.deleteCategory);

// GenerateList
app.post('/generatelist', generateList.generateList);


// User or Customer
app.post('/login', user.login);
app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function() {
    res.redirect("/");
  });
});
app.get('/getcustomer/:uid', user.getCustomer);
app.get('/getcustomers', user.getCustomers);
app.get('/getuser/:uid', user.getUser);
app.get('/getusers', user.getUsers);
app.post('/createuser', user.createUser);
app.get('/deleteuser/:uid', user.deleteUser);
/*app.get('/private', 
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
*/
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
