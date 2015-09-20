(function(){
    angular.module('gitApp')

        .factory('dataService',['$q','$http',dataService]);

    function dataService($q,$http){
            return {
                sendLink : sendLink,
                getIssues : getIssues
            };
        function sendLink(newRepo){
            console.log('DATA:'+angular.toJson(newRepo))
            return $http({
                method:'POST',
                url:'api/repo',
                data:newRepo
            })
                .then(getRepoSuccess)
                .catch(getRepoError);

        }
        function getRepoSuccess(response){
            return response;
        }
        function getRepoError(errorResponse){
            return $q.reject(errorResponse);

        }
        function getIssues(createrias){
            console.log('Calling Service;')
            return $http({
                method:'POST',
                url:'api/getissues/'+createrias.crite,
                data:createrias
            })
                .then(getIssueResponse)
                .catch(getIssuesError);
            function getIssueResponse(response){
                return response;
            }
            function getIssuesError(errorResponse){
                return $q.reject(errorResponse);
            }

        }
    }
})();