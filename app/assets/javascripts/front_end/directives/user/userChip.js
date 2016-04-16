function userChip() {
	return {
		restrict: 'E',
		scope: {
			userId: '='
		},
		transclude: true,
		controller: function(ApiService, $scope){
			var chipCtrl =  this;

			chipCtrl.load = function(id){
				ApiService.users.show(id).then(function(res){
					$scope.user = res.data;
				});
			};

  	},
		controllerAs: 'chipCtrl',
		template: [
			'<div class="chip">',
				'<img ng-src="{{user.img.tiny}}">',
				'<ng-transclude></ng-transclude>{{user.name}}',
			'</div>',
		].join(''),
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('userId', function (id) {
	        if (id!=undefined) ctrl.load(id);
	    });
		}
	};
}

angular
	.module('app')
	.directive('userChip', userChip);
