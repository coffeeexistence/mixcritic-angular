function userCard(Users) {
	return {
		restrict: 'E',
		scope: {
			userId: '='
		},
		transclude: true,
		controller: ['ApiService', '$scope', function(ApiService, $scope){
			var cardCtrl =  this;

			cardCtrl.load = function(id){
				 Users.find(id).then(function(user) {
					 $scope.user = user;
				 });
			};

  	}],
		controllerAs: 'cardCtrl',
		template: [
			'<div class="user-card center ">',
				'<a ui-sref="userProfile({id: user.id})" class="primary-color-text text-lighten-1">',
					'<img class="user-card-img" ng-src="{{user.img.thumb}}"><br>',
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
	.directive('userCard', ['Users', userCard]);
