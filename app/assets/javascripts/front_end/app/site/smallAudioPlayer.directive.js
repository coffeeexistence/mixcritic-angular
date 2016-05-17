function smallAudioPlayer() {
	return {
		restrict: 'E',
		scope: {
			url: '='
		},
		controller: ['$sce', function($sce){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(url){
				ctrl.url = $sce.trustAsResourceUrl(url);
				ctrl.show = true;
				//console.log('loaded');
			};
  	}],
		controllerAs: 'smallAudioCtrl',
		template: [
			'<div class="audio" ng-if="smallAudioCtrl.show">',
			  '<audio controls>',
			    '<source ng-src="{{smallAudioCtrl.url}}" type="audio/mpeg">',
			  'Your browser does not support the audio element.',
			  '</audio>',
			'</div>'
		].join(''),
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('url', function (url) {
	        if (url!==undefined) {ctrl.load(url); console.log(url); }
	    });
		}
	};
}

angular
	.module('app')
	.directive('smallAudioPlayer', smallAudioPlayer);
