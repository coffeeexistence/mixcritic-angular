function critiqueForm() {
	return {
		restrict: 'E',
		scope: {
			revision: '=',
			reloadCritiques: '&'
		},
		controller: ['$scope', 'ApiService', '$sce', 'Auth', 'UserService', function($scope, ApiService, $sce, Auth, UserService){
			var ctrl =  this;
			ctrl.show = false;

			$scope.session = UserService.session;
			$scope.currentUserName = UserService.currentUserName();

			ctrl.load = function(id){
					ctrl.show = true;
			};

			ctrl.post = function(event){
				event.preventDefault();
				console.log('‘Clicked!’');

				ApiService.critiques.create($scope.revision.id, ctrl.critique).then(function(res){
					ctrl.comment.body = '';
					$scope.$parent.loadComments();
				});
			};

  	}],
		controllerAs: 'NewCritiqueCtrl',
		templateUrl: 'mix/critique/critique_form_tpl.html',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('revision', function (rev) {
	        if (rev!==undefined) {ctrl.load(rev); console.log(rev); }
	    });
		}
	};
}

angular
	.module('app')
	.directive('critiqueForm', critiqueForm);
