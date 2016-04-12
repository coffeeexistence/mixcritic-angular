function userChip() {
	return {
		restrict: 'E',
		scope: {
			userId: '='
		},
		controller: function(ApiService, $scope, $filter, $attrs){
			var chipCtrl =  this;

			chipCtrl.load = function(id){
				ApiService.shortUserInfo(id).then(function(res){
					chipCtrl.user = res.data;
				});
			};

  	},
		controllerAs: 'chipCtrl',
		template: [
			'<div class="chip">',
				'<img ng-src="{{chipCtrl.user.img.tiny}}">',
				'{{chipCtrl.user.name}}',
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
