
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
  http = require('http'),
  path = require('path'),
  session = require('express-session'),
  passport = require('passport'),
  DigestStrategy = require('passport-http').DigestStrategy,
  _ = require('underscore');

var local = require('./config/local'),
    api = require('./routes/api');

var app = module.exports = express();

passport.serializeUser(function(user, done) {
  // console.log(user);
  done(null, user);
  });

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new DigestStrategy({
  },
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure.  Otherwise, return the authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password != password) { return done(null, false); }
        return done(null, user);
      })
    });
  }
));

var RedisStore = require('connect-redis')(session),
  sessionRedis = new RedisStore(local.session.redis);

app.use(session({
  store: sessionRedis,
  secret: "hello",
  cookie: {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    maxAge: 30 * 24 * 60 * 60 * 1000
  },
  resave: true,
  saveUninitialized: true
}));

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
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

app.post('/login', 
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
