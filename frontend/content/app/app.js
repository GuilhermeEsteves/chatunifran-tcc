angular.module('ti', ['ng.deviceDetector', 'ngRoute', 'ngCookies', 'gearUi', 'chart.js', 'angular.chosen', 'vAccordion', 'ui-notification', 'ngAnimate', 'ui.utils.masks', 'ngFileUpload', 'ui', 'ui.sortable', 'ngIOS9UIWebViewPatch']);
angular.module("ti").config(['$httpProvider', function($httpProvider) {
    var interceptor = ['$q', '$window', '$location', '$injector', 'gearSnack', 'gearColor', '$rootScope', '$cookies', '$timeout', 'deviceDetector', function($q, $window, $location, $injector, gearSnack, gearColor, $rootScope, $cookies, $timeout, $deviceDetector) {
        return {
            request: function(xhr) {
                $rootScope.loading = true;
                if (!$cookies.get('ti')) {
                    $location.path('/');
                    return $q.when(xhr);
                } else {
                    xhr.headers.Authorization = $cookies.get('ti');
                    return $q.when(xhr);
                }
            },
            requestError: function(xhr) {
                return $q.reject(xhr);
            },
            response: function(xhr) {
                delete $rootScope.loading;

                if (xhr.data && xhr.data.errorCode) {
                    retornaErro(xhr);
                    return $q.reject(xhr);
                } else {
                    return $q.when(xhr);
                }
            },
            responseError: function(xhr) {
                delete $rootScope.loading;
                var isCancelled = xhr.config.timeout ? xhr.config.timeout.$$state.value == 499 : false;
                if (xhr.config.headers && xhr.config.headers.InterceptorValidation !== false && !isCancelled) {
                    if (xhr.status < 0) {
                        xhr.data = {
                            userMessageTranslated: "Não foi possível estabelecer uma conexão com as APIs do sistema.",
                            userMessage: "Não foi possível estabelecer uma conexão com as APIs do sistema."
                        };
                        retornaErro(xhr);
                        return $q.reject(xhr);
                    } else {
                        retornaErro(xhr);
                        return $q.reject(xhr);
                    }
                } else {
                    return $q.reject(xhr);
                }
            }
        };

        function retornaErro(xhr) {
            gearSnack.show({
                text: (xhr.data && xhr.data.content) ?
                    (xhr.data.content.userMessageTranslated || xhr.data.content.userMessage) :
                    (xhr.data.userMessageTranslated || xhr.data.userMessage),
                delay: 15000,
                action: function() {
                    gearSnack.hide();
                    $rootScope.scope.gear.dialogs['detalhes-erro'].open();
                    $rootScope.scope.detalheErro = {
                        url: xhr.config.method.toUpperCase() + " - " + xhr.config.url,
                        detalhamento: {
                            response: (xhr.data && xhr.data.content) ? xhr.data.content : xhr.data,
                        },
                        navegador: $deviceDetector.browser + " " + $deviceDetector.browser_version,
                        so: $deviceDetector.os + " " + $deviceDetector.os_version,
                        statusCode: xhr.status + " | " + xhr.statusText,
                        usuario: $rootScope.usuario,
                        data: new Date(),
                        mensagem: xhr.data.userMessageTranslated || xhr.data.userMessage || xhr.data.content.userMessage,
                        urlApigee: (xhr.data) ? xhr.data.urlApigee : '--'
                    };
                },
                actionText: 'Detalhes',
                actionColor: gearColor.material.lightBlue.A200
            });
        }
    }];

    $httpProvider.interceptors.push(interceptor);
}]);

angular.module('ti').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            caseInsensitiveMatch: true,
            controller: 'authenticationController',
            templateUrl: '/view/home.html',
            title: 'Login'
        })
        .when('/home', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/home.html',
            title: 'Home'
        })
        .when('/pendencias', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/consultas/minhasPendencias.html',
            controller: 'minhasPendenciasController',
            title: 'Pendências'
        })
        .when('/minhassolicitacoes', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/consultas/consultaSolicitacao.html',
            controller: 'consultaSolicitacaoController',
            title: 'Minhas Solicitações'
        })
        .when('/consultarsolicitacoes', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/consultas/consultaSolicitacao.html',
            controller: 'consultaSolicitacaoController',
            title: 'Consultar Solicitações'
        })
        .when('/novasolicitacao', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/novaSolicitacao.html',
            controller: 'solicitacaoController',
            title: 'Nova Solicitação'
        })

    //Relatorios
    .when('/relatorios/diretorias', {
        caseInsensitiveMatch: true,
        templateUrl: '/view/relatorios/diretorias.html',
        controller: 'relatoriosDiretoriasController',
        title: 'Diretorias Executivas'
    })

    //WorkFlow
    .when('/workflow/acao', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/workflow/workflowAcao.html',
            controller: 'workflowAcaoController',
            title: 'Ações Workflow'
        })
        .when('/workflow/perfis', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/workflow/workflowPerfis.html',
            controller: 'workflowPerfisController',
            title: 'Workflow - Perfis'
        })
        .when('/workflow/estagios', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/workflow/workflowEstagio.html',
            controller: 'workflowEstagioController',
            title: 'Workflow - Estágios'
        })
        //---------------------------------------
        .when('/cadastro/questionario', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/questionario.html',
            controller: 'questionarioController',
            title: 'Cadastro do Questionário'
        })
        .when('/relatorioranqueamento', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/consultas/relatorioranqueamento.html',
            controller: 'relatorioRanqueamentoController',
            title: 'Pendências'
        })
        .when('/cadastro/beneficio', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/beneficio.html',
            controller: 'beneficioController',
            title: 'Beneficios'
        })
        .when('/cadastro/areanegocio', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/areanegocio.html',
            controller: 'areanegocioController'
        })
        .when('/cadastro/diretoriaExecutiva', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/diretoriaExecutiva.html',
            controller: 'diretoriaExecutivaController',
            title: 'Diretoria Executiva'
        })
        .when('/cadastro/programa', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/programa.html',
            controller: 'programaController',
            title: 'Programa'
        })
        .when('/cadastro/programaEstrategico', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/programaEstrategico.html',
            controller: 'programaEstrategicoController',
            title: 'Programa Estrategico'
        })
        .when('/cadastro/portifolio', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/portifolio.html',
            controller: 'portifolioController',
            title: 'Portifólio'
        })
        .when('/cadastro/pilarestrategico', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/pilarEstrategico.html',
            controller: 'pilarEstrategicoController',
            title: 'Pilar Estratégico'
        })
        .when('/estagios', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/estagios.html',
            controller: 'estagiosController'
        })
        .when('/relatorios/logs', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/relatorios/logs.html',
            controller: 'logsController'
        })
        .when('/cadastro/sistemasImpactados', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/sistemasImpactados.html',
            controller: 'sistemasImpactadosController',
            title: 'Sistemas'
        })
        .when('/cadastro/tipoFuncionalidade', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/cadastros/tipoFuncionalidade.html',
            controller: 'tipoFuncionalidadeController'
        })
        .when('/preAnalise/preAnalise', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/preAnalise/preAnalise.html',
            controller: 'preAnaliseController'
        })
        .when('/404', {
            caseInsensitiveMatch: true,
            templateUrl: '/view/404.html',
            title: 'Pagina não encontrada'
        })
        .otherwise({
            redirectTo: '/404',
            title: 'Pagina não encontrada'
        });

    $locationProvider.html5Mode(true);
}]).run(function($location, $cookies, $rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        var baseTitle = 'Núcleo de Projetos';
        document.title = ($route.current.title ? $route.current.title + ' - ' + baseTitle : baseTitle);
    });
    if (!$cookies.get('ti'))
        $location.path('');

}).controller('tiCtrl', function($scope) {
    $scope.app = 'TI';
    $scope.client = 'Magazine Luiza';
    $scope.$on('routeChange', function(event, current, previous, error) {
        console.log('current', current);
        // if (error.status === 404) {
        //     alert();
        //     $location.path('/404');
        // }
    });
    $scope.removeAccents = function() {
        return function(item) {
            console.log(item);
        };

        var strAccents = strAccents.split('');
        var strAccentsOut = new Array();
        var strAccentsLen = strAccents.length;
        var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        var accentsOut = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
        for (var y = 0; y < strAccentsLen; y++) {
            if (accents.indexOf(strAccents[y]) != -1) {
                strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
            } else
                strAccentsOut[y] = strAccents[y];
        }
        strAccentsOut = strAccentsOut.join('');
        return strAccentsOut;
    }
    $scope.$on('$routeChangeSuccess', function() {
        $('#btn-main-menu.back').click();
        // ROTA ALTERADA COM SUCESSO
        // Gear.dialog.hide({ all: true, keepOnHTML: false })
    });
}).directive('mlRemoveLi', function($animate) {
    return {
        restrict: 'A',
        scope: {
            'mlRemoveLi': '=',
            'mlRemoveFinish': '&'
        },
        link: function($scope, $element, $attr, ctrl, $transclude) {
            $scope.$watch('mlRemoveLi', function(value, oldValue) {
                if (value)
                    $animate.addClass($element, 'item-removed').then($scope.mlRemoveFinish);
            });
        }
    };
}).directive("ngMobileClick", [function() {
    return function(scope, elem, attrs) {
        elem.bind("touchstart click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            scope.$apply(attrs["ngMobileClick"]);
        });
    }
}]);