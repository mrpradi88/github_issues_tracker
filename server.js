var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var fetchRepos = require('./routes/fetchRepos');
var fetchIssues = require('./routes/fetchIssues');

var app = express();
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
    .get('*',function(req,res){
      res.sendfile('public/html/index.html');
    });

app.use('/api/repo',fetchRepos);
app.use('/api/getissues',fetchIssues)

app.listen(server_port, server_ip_address, function(){
    console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});