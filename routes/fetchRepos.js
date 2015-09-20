var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

        //routing handling method to serve the categories under a repository.
        router.post('/',function(req,res){
            var url = 'https://api.github.com/users/';
            var reqUrl = url+req.body.repoLink+'/repos';
            request({url:reqUrl,method:'GET', headers: {
                'content-Type': 'application/json',
                'User-Agent': 'github-demo-app'
            }},function(err,response,body){
                if(err){
                    res.status(err.status).send({error:'Error occured.'});
                    console.log('Error Occured')
                }else{
                    var resVal = JSON.parse(body);
                    var issues = [];
                    for(var obj in resVal){
                       var splitedVal =  resVal[obj].issues_url.substring(29+req.body.repoLink.length,resVal[obj].issues_url.length);
                         issues.push(splitedVal.split("/")[1]);
                    }
                    res.send(issues);
                }
            })
        });

module.exports = router;