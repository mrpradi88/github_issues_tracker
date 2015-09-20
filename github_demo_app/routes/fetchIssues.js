var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

//Date of 24 hours ago
var oneDayAgo = moment().subtract(1, 'days').toISOString();
//Date of 7 days ago
var sevenDayAgo = moment().subtract(7,'days').toISOString();

    //routing handling method to serve total number open issues.
        router.post('/open',function(req,res){
            var responseObj = [];
            var page = 1;
            (function getAllOpenIssues(page){
                getIssues(req.body.repo,req.body.cate,null,page,function(body){
                    if(body.length != 2) {
                        var resObj = JSON.parse(body);
                        for(var ele in resObj){
                            responseObj.push(resObj[ele].created_at);
                            //console.log('DATE:',resObj[ele].created_at)
                        }
                        //calling getAllOpenIssues method recursively until pagination cursor exhaust.
                        getAllOpenIssues(++page);
                    }else {
                        res.send({"open_issues":responseObj.length,"date":responseObj})
                        }
                })
            })(page);
        });

        //routing handling method to serve last 24 hours open issues.
        router.post('/oneday',function(req,res){
            var url = 'https://api.github.com/repos/';
            var responseObj = [];
            var responseReadyData = [];
            var page = 1;
            (function oneDayAgoIssue(page){
                getIssues(req.body.repo,req.body.cate,oneDayAgo,page,function(body){
                    var resObj = JSON.parse(body);
                    if(body.length != 2) {
                        for(var ele in resObj){
                            responseObj.push(resObj[ele]);
                        }
                        //calling oneDayAgoIssue method recursively until pagination cursor exhaust.
                        oneDayAgoIssue(++page);
                    }else {
                        for(var obj in responseObj){
                            if(responseObj[obj].created_at > oneDayAgo ){
                                responseReadyData.push(responseObj[obj].created_at);
                            }
                        }
                        res.send({"open_issues":responseReadyData.length,"date":responseReadyData})
                    }
                })
            })(page);

        });

        //routing handling method to serve last seven days and not 24 hours open issues.
        router.post('/sevenday',function(req,res){
            var responseObj = [];
            var responseReadyData = [];
            var page = 1;
            (function sevenDayAgoIssue(page){
                getIssues(req.body.repo,req.body.cate,sevenDayAgo,page,function(body){
                    var resObj = JSON.parse(body);
                    if(body.length != 2) {
                        for(var ele in resObj){
                            responseObj.push(resObj[ele]);
                            console.log(JSON.stringify(ele))
                        }
                        //calling sevenDaysAgoIssue method recursively until pagination cursor exhaust.
                        sevenDayAgoIssue(++page);
                    }else {
                        for(var obj in responseObj){
                            if(responseObj[obj].created_at > sevenDayAgo && responseObj[obj].created_at < oneDayAgo){
                                responseReadyData.push(responseObj[obj].created_at);
                            }
                        }
                        res.send({"open_issues":responseReadyData.length,"date":responseReadyData})
                    }
                })
            })(page);

        });

        //routing handling method to serve open issues more than seven days.
        router.post('/morethanseven',function(req,res){
            var responseObj = [];
            var responseReadyData = [];
            var page = 1;
            (function moreThanSevenDayAgoIssue(page){
                getIssues(req.body.repo,req.body.cate,null,page,function(body){
                    var resObj = JSON.parse(body);
                    if(body.length != 2) {
                        for(var ele in resObj){
                            responseObj.push(resObj[ele]);
                        }
                        //calling moreThanSevenDayAgoIssue method recursively until pagination cursor exhaust.
                        moreThanSevenDayAgoIssue(++page);
                    }else {
                        for(var obj in responseObj){
                            if(responseObj[obj].created_at < sevenDayAgo){
                                responseReadyData.push(responseObj[obj].created_at);
                           }
                        }
                        res.send({"open_issues":responseReadyData.length,"date":responseReadyData})
                    }

                })
            })(page);

        });

        //Helper method to invoke the service to fetch records.
        //This method takes parameter as git repository,category,since date,
        // pagination parameter and Callback respectively.
        var getIssues = function (repo,cate,since,page,callback) {
            var url = 'https://api.github.com/repos/';
            if (since) {
                var req_Url = url + repo + '/' + cate + '/issues?state=open&since='+since+'&per_page=100&page=' + page;
            } else {
                var req_Url = url + repo + '/' + cate + '/issues?state=open'+'&per_page=100&page=' + page;
            }
            request({
                url: req_Url, method: 'GET', headers: {
                    'content-Type': 'application/json',
                    'User-Agent': 'github-demo-app'
                }
            }, function (err, response, body) {
                if (err) {
                    res.status(err.status).send({error: 'Error occured.'});
                    console.log('Error Occured')
                } else {

                    callback(body);
                }
            })
        }

module.exports = router;