angular.module('chatunifran').controller('loginController',function($scope,$location){
    
    $scope.login = function(){
         $location.path('/home');

        // if(!$scope.rgm || !$scope.password){
        //     alert('Preencha os campos');
        //     return;
        // }

        // $.ajax({
        //     url: "http://localhost:3000/login/" + $scope.rgm,
        //     headers: {
        //         'password': $scope.password
        //     },
        //     method: 'GET',
        //     success: function(data){
        //         console.log(data);
        //         $location.path('/home');
        //     },
        //     error: function(xhr){
        //         console.log(xhr);
        //     }
        // })
    }
});