angular.module('cobAdmin').directive('mlMaskCartaoMl', function(){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var _formatCartaoMl = function(cartaoMl){
				if (!cartaoMl) return;
				cartaoMl = cartaoMl.toString().replace(/[^0-9]+/g, '');
				if (cartaoMl.length > 1)
					cartaoMl = cartaoMl.slice(0,-1) + '-' + cartaoMl.slice(-1);
				return cartaoMl;
			}

			element.bind('keyup focusout keypress', function(){
				ctrl.$setViewValue(_formatCartaoMl(ctrl.$viewValue));
				ctrl.$render();
			});

			ctrl.$formatters.push(function(value){
				return _formatCartaoMl(value)
			});
		}
	}
})