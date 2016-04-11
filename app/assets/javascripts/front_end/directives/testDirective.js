function testDirective() {
	return {
		restrict: 'E',
		scope: {

		},
		controller: function($attrs, $scope, $sce){
			console.log('I am a directive');
  	},
		controllerAs: 'ctrl',
		template: 'this should be a directive'

	};
}

angular
	.module('app')
	.directive('testDirective', testDirective);

console.log('in the directive file, but not the directive itself');
