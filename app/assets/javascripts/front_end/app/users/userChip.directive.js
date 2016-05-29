function userChip(Users) {
	return {
		restrict: 'E',
		scope: {
			userId: '='
		},
		transclude: true,
		controller: ['ApiService', '$scope', function(ApiService, $scope){
			var chipCtrl =  this;

			chipCtrl.load = function(id){
				 Users.find(id).then(function(user) {
					 $scope.user = user;
				 });
			};

  	}],
		controllerAs: 'chipCtrl',
		template: [
			'<div class="chip">',
				'<img ng-src="{{user.img.tiny}}">',
				'<a ui-sref="userProfile({id: user.id})" class="primary-color-text text-lighten-1"',
					'<ng-transclude></ng-transclude>{{user.name}}',
				'</a>',
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
	.directive('userChip', ['Users', userChip]);
