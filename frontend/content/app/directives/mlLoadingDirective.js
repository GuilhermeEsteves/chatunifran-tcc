angular.module('chatunifran').directive('mlLoading', function(){
	return {
		transclude: true,
		template: '<i class="material-icons">refresh</i><span ng-if="text">{{text}}<span>',
		scope: {
			text: '@?'
		}
	};
});