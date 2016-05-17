function newCritiqueComment() {
	return {
		restrict: 'E',
		scope: {
			critique: '='
		},
		controller: ['ApiService', '$sce', '$scope', 'UserService', function(ApiService, $sce, $scope, UserService){
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
					ctrl.comment.body = '';
					$scope.$parent.loadComments();
				});
			};

  	}],
		controllerAs: 'NewCommentCtrl',
		template: [
			'<ul class="collection row">',
				'<li ng-if="!session.loggedIn" class="collection-item">Log in or Register to comment</li>',
				'<form name="commentForm" ng-if="session.loggedIn" class="collection-item">',
					'<span>Write comment as {{currentUserName}}:</span>',
					'<input class="col s10" ng-model="NewCommentCtrl.comment.body" type="text" name="body>" required>',
					'<input ng-disabled="commentForm.$invalid" class="col s2 btn" ng-click="NewCommentCtrl.post($event);" type="submit" name="submit">',
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
