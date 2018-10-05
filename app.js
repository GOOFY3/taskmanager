var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var redis = require('redis');

var app = express();

//redis client
var client = redis.createClient();
client.on('connect', () => {
  console.log('redis Server sonnected!');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyParser, logger and public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => {
  client.lrange('tasks', 0, -1, (err, reply) => {
      res.render('todo', {tasks:reply});
  });
})

app.listen(3000);
console.log('Server started on 3000');

module.exports = app;
