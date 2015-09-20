(function(){
    var app = angular.module('gitApp',['ngRoute']);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/',{
            templateUrl:'/html/templates/queryPage.html',
            controller:'queryController',
            controllerAs:'query'
        })
            .when('/getissues/:repo/:cate/:crite',{
                templateUrl:'/html/templates/issuePage.html',
                controller:'issuesController',
                controllerAs:'issues'
            })
            .otherwise('/')
    }]);

})();