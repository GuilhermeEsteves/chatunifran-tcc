angular.module('ti')
    .filter('getOptionByCodigo', function(codigo){
        return function(array, codigo){

        }
    })
    .directive('mlFavoriteStar', function(){
        return {
            scope: {
                'mlFavoriteStar': '='
            },
            link: function(scope, element) {
                scope.$parent.$watch('usuario.favoritos', function (newVal, oldVal) {
                    for(var i in newVal)
                        if(newVal[i].codigo === scope.mlFavoriteStar.codigo)
                        {
                            element.addClass('gear-fav-add');
                            element.children().html('star')
                            return;
                        }
                    element.removeClass('gear-fav-add');
                    element.children().html('star_border')

                }, true);

                element.bind('click', function (event) {
                    scope.$parent.toogleFlagOpcaoMenu(scope.mlFavoriteStar);
                    scope.$parent.$digest();
                });
            }
        }
    })