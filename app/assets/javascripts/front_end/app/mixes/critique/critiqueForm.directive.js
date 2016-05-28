function critiqueForm() {
	return {
		restrict: 'E',
		scope: {
			revision: '=',
			reloadCritiques: '&'
		},
		controller: ['$scope', 'ApiService', '$sce', 'Auth', 'Session', function($scope, ApiService, $sce, Auth, Session){
			var ctrl =  this;
			ctrl.show = false;

			$scope.session = Session.session;
			$scope.currentUserName = Session.currentUserName();

			$scope.critique = {
				body: ''
			};

			ctrl.load = function(id){
					ctrl.show = true;
			};

			ctrl.post = function(event){
				event.preventDefault();
				console.log('‘Clicked!’');

				ApiService.critiques.create($scope.revision.id, {critique: $scope.critique}).then(function(res){
					$scope.critique.body = '';
					$scope.$parent.reloadCritiques(res.data.id); //Tells parent to focus on critique with new critique's id
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
