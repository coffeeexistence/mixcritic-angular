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
					critique_id: critique.id,
					body: 'hi',
					user_id: UserService.session.user.id
				};

			};



			$scope.currentUserName = UserService.currentUserName();

			ctrl.post = function(event){
				event.preventDefault();
				console.log('‘Clicked!’');
				ApiService.newCritiqueComment(ctrl.comment).then();
			};

  	},
		controllerAs: 'NewCommentCtrl',
		template: [
			'<ul class="collection">',
				'<form class="collection-item">',
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
