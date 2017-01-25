angular.module('ti').controller('errorController', ['$rootScope', '$location', '$scope', '$route', '$timeout', '$cookies', '$http', function($rootScope, $location, $scope, $route, $timeout, $cookies, $http){
    $rootScope.scope = $scope;
    
    $scope.copiarErro = function () {
        var target = document.getElementById('errorDiv');
        if (target.select)
            target.select();
        else {
            var range = document.createRange();
            range.selectNodeContents(target);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };
}]);