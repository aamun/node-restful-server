// Require modules
var application_root = __dirname,
    express = require('express'),
    mongoose = require('mongoose'),
    path = require("path"); // mongoose is a mongoDB driver

// Create app
var app = express();

// Configure app
app.configure(function() {
    // app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(application_root, "public")));
});

// Connect
mongoose.connect('mongodb://localhost/test');

// Models
var User = mongoose.model('users', new mongoose.Schema({
        // _idUser: Number,
        username: String,
        email: String,
        password: String,
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }, {strict: true}));

/**
 * Routes Rest API
 *
 */

app.get('/api', function (req, res) {
  res.send('API is running');
});


/* Users */

// GET
app.get('/users', function(req, res){
    User.find({}, function(err, data){
        res.json(data);
    });
});

// GET with id
app.get('/users/:id', function(req, res){
    User.findOne({_id: req.params.id}, function(err, data){
        res.json(data);
    });
});

// POST
app.post('/users', function(req, res){
    new User(req.body).save(function(err, data){
        if (err) {
            console.log(err);
        }

        res.json(data);
    });
});

// PUT
app.put('/users/:id', function(req, res){
    User.update({_id: req.params.id}, req.body, {multi: false}, function(err, count){
        res.json({count:count});
    });
});

// Delete
app.delete('/users/:id', function(req, res){
    User.remove({_id: req.params.id}, function(err, count){
        if (err) {
            console.log(err);
        };
        res.json({count:count});
    });
});

app.listen(3000);
console.log('Listening on port 3000...');