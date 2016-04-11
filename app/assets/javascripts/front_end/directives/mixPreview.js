function mixPreview() {
	return {
		restrict: 'E',
		scope: {
			mix: '=',
		},
		require: '^mixes',
		controller: function($attrs, $scope){
			var mixCtrl =  this;

			mixCtrl.mix = $scope.mix;
  	},
		controllerAs: 'mixCtrl',
		templateUrl: 'mixes/mix_preview_template.html'
	};
}

angular
	.module('app')
	.directive('mixPreview', mixPreview);
