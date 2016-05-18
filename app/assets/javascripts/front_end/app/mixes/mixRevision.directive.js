function mixRevision() {
	return {
		restrict: 'E',
		scope: {
			id: '='
		},
		controller: ['ApiService', '$sce', '$scope', '$document', '$timeout', '$filter',
			function(ApiService, $sce, $scope, $document, $timeout, $filter){
				var ctrl =  this;
				ctrl.show = false;

				ctrl.scrollToCritique = function(id) {
					var critique = $filter('filter')($scope.revision.critiques, {id: id})[0]
					debugger;
					critique.focus = true;
				};

				ctrl.load = function(id, scrollToCritique){
					ApiService.revisions.show(id).then(function(res){
						$scope.revision = res.data;
						ctrl.id = id;
						ctrl.show = true;
						console.log($scope.revision);
						if(scrollToCritique) { ctrl.scrollToCritique(scrollToCritique) }
					});
				};

				$scope.reloadCritiques = function(scrollToCritique){
					console.log('going to reload critiques');
					ctrl.load($scope.revision.id, scrollToCritique);
				};

	  	}],
		controllerAs: 'RevCtrl',
		templateUrl: 'mix/revision_tpl.html',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('id', function (id) {
	        if (id!==undefined) {ctrl.load(id); console.log(id); }
	    });
		}
	};
}

angular
	.module('app')
	.directive('mixRevision', mixRevision);
