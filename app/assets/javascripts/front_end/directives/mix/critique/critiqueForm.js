function critiqueForm() {
	return {
		restrict: 'E',
		scope: {
			revision: '='
		},
		controller: function(ApiService, $sce, Auth){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(id){
				ApiService.getRevision(rev).then(function(res){
					ctrl.revision = res.data;
					ctrl.show = true;
				});

			};
  	},
		controllerAs: 'RevCtrl',
		templateUrl: 'mix/critique/critique_form.tpl.html',
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
