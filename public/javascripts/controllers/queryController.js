(function(){
    angular.module('gitApp')
        .controller('queryController',['dataService',queryController]);

    function queryController(dataService){
        var vm = this;
        vm.newRepo = {};
        vm.crite = {};
        vm.issuesList = {};
        vm.gotRepos = false;
        vm.since = {};
        vm.progressFlag = false;

        vm.sendLink = function(){
            vm.progressFlag = true;
            dataService.sendLink(vm.newRepo)
                .then(responseSuccess)
                .catch(responseError)
                .finally(stopProgress)

                function responseSuccess(response){
                    if(response.data != null) {
                        vm.gotRepos = true;
                        vm.issuesList = response.data;
                    }
                }
                function responseError(err){
                        return console.log('ERROR:'+err.status);
                }
            function stopProgress(){
                vm.progressFlag = false;
            }
        }
    }
})();