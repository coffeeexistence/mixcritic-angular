function mixRevision() {
	return {
		restrict: 'E',
		scope: {
			id: '='
		},
		controller: ['ApiService', '$sce', '$scope', function(ApiService, $sce, $scope){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(id){
				ApiService.revisions.show(id).then(function(res){
					$scope.revision = res.data;
					ctrl.id = id;
					ctrl.show = true;
					console.log($scope.revision);
				});
			};
  	}],
		controllerAs: 'RevCtrl',
		templateUrl: 'mix/revision.tpl.html',
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
