angular.module('ti')
    .directive('dataTableDirective', function(){
        return {
            link: function(scope, element) {
                $('.dataTable').dataTable();
            }
        }
    })






