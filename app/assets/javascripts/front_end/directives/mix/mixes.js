function mixes() {
	return {
		restrict: 'E',
		scope: {
		},
		controller: function(ApiService, $attrs, $scope, $sce){
			var mixes =  this;

			mixes.loadMixes = function(){
				ApiService.mixes.index().then(function(res){
					mixes.mixes = res.data;
				});
			}

			mixes.loadMixes();
  	},
		controllerAs: 'mixes',
		template: [
				'<div class="medium-text thin-text">People looking for constructive feedback:</div>',
				'<mix-preview ng-repeat="mix in mixes.mixes" mix="mix"></mix-preview>'
		].join('')

	};
}

angular
	.module('app')
	.directive('mixes', mixes);
