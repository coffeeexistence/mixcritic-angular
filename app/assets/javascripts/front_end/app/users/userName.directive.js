function userName() {
	return {
		restrict: 'E',
		scope: {
			userId: '='
		},
		transclude: true,
		controller: ['ApiService', '$scope', '$filter', '$attrs', function(ApiService, $scope, $filter, $attrs){
			var chipCtrl =  this;

			chipCtrl.load = function(id){
				ApiService.shortUserInfo(id).then(function(res){
					chipCtrl.user = res.data;
				});
			};

  	}],
		controllerAs: 'nameCtrl',
		template: '{{nameCtrl.user.name}}<ng-transclude></ng-transclude>',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('userId', function (id) {
	        if (id!=undefined) ctrl.load(id);
	    });
		}
	};
}

angular
	.module('app')
	.directive('userName', userName);
