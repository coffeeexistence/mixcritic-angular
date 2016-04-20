function mixPreview() {
	return {
		restrict: 'E',
		scope: {
			mix: '=',
		},
		require: '^mixes',
		controller: function($attrs, $scope, $filter){
			var mixCtrl =  this;

			mixCtrl.expanded = false;
			mixCtrl.mix = $scope.mix;
			mixCtrl.wordLimit = 180;

			mixCtrl.short_description = function(){
				var description = $filter('limitTo')(mixCtrl.mix.description, mixCtrl.wordLimit);
				if (mixCtrl.mix.description.length > mixCtrl.wordLimit) description+='...';
				return description;
			}

			mixCtrl.expand = function(){
				mixCtrl.expanded = true;
			};

  	},
		controllerAs: 'mixCtrl',
		templateUrl: 'mixes/mix_preview.tpl.html'
	};
}

angular
	.module('app')
	.directive('mixPreview', mixPreview);
