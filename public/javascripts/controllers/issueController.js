(function(){
    angular.module('gitApp')
        .controller('issuesController',['dataService','$routeParams',issuesController]);

    function issuesController(dataService,$routeParams){
        var vm = this;
        vm.params = {};
        vm.issuesList = {};

            vm.params.repo = $routeParams.repo;
            vm.params.cate = $routeParams.cate;
            vm.params.crite = $routeParams.crite;
            vm.progressFlag = true;
            dataService.getIssues(vm.params)
                .then(getIssueResponse)
                .catch(getIssuesError)
                .finally(stopProgress)
            function getIssueResponse(response){
                return vm.issuesList = response.data;
            }
            function getIssuesError(errorResponse){
               if(errorResponse){
                    console.log('ERROR OCCURED')
               }
            }
        function stopProgress(){
                vm.progressFlag = false;
        }

    }

})();