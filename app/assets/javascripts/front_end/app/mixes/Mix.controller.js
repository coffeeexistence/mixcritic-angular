function MixController($scope, $stateParams, mix){
	var ctrl = this;
	// debugger;
	ctrl.mix = mix.data;
  if ($stateParams.critique_id) {
		$scope.$on("critique-"+$stateParams.critique_id+"-loaded", function(){
			console.log("critique-"+$stateParams.critique_id+"-focus");
			$scope.$broadcast("critique-"+$stateParams.critique_id+"-focus", {focus: true});
		});
	}
}

angular
	.module('app')
	.controller('MixController', ['$scope', '$stateParams', 'mix', MixController]);
