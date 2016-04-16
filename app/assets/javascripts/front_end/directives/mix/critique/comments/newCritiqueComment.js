function newCritiqueComment() {
	return {
		restrict: 'E',
		scope: {
			critique: '='
		},
		controller: function(ApiService, $sce, $scope, UserService){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(critique){
				$scope.critique = critique;

				ctrl.comment = {
					body: ''
				};

			};

			$scope.session = UserService.session;

			$scope.currentUserName = UserService.currentUserName();

			ctrl.post = function(event){
				event.preventDefault();
				console.log('‘Clicked!’');
				routeParams = {
					critique: $scope.critique.id,
					revision: $scope.critique.revision_id
				};
				ApiService.critiqueComments.create(routeParams, ctrl.comment).then(function(res){
					$scope.$parent.loadComments();
				});
			};

  	},
		controllerAs: 'NewCommentCtrl',
		template: [
			'<ul class="collection">',
				'<li ng-if="!session.loggedIn" class="collection-item">Log in or Register to comment</li>',
				'<form ng-if="session.loggedIn" class="collection-item">',
					'<p>Write comment as {{currentUserName}}:</p>',
					'<input ng-model="NewCommentCtrl.comment.body" type="text" name="body>">',
					'<input ng-click="NewCommentCtrl.post($event);" type="submit" name="submit">',
				'</form>',
			'</ul>'
		].join(''),
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('critique', function (critique) {
	        if (critique!==undefined) {ctrl.load(critique); console.log(critique); }
	    });
		}
	};
}

angular
	.module('app')
	.directive('newCritiqueComment', newCritiqueComment);
