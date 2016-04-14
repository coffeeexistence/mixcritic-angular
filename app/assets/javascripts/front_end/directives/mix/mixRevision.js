function mixRevision() {
	return {
		restrict: 'E',
		scope: {
			id: '='
		},
		controller: function(ApiService, $sce, $scope){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(id){
				ApiService.getRevision(id).then(function(res){
					$scope.revision = res.data;
					ctrl.id = id;
					ctrl.show = true;
					console.log($scope.revision);
				});



			};
  	},
		controllerAs: 'RevCtrl',
		templateUrl: 'mix/revision_template.html',
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
