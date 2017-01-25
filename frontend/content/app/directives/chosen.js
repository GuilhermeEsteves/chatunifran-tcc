angular.module('ti')
.directive('chosenDirective', function($timeout){
        return {
            scope: {
            },
            link: function(scope,element,attrs) {
                $.validator.setDefaults({ ignore: ":hidden:not(select)" });
            }
        }
    }
);




    
