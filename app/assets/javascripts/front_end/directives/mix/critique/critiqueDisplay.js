function critiqueDisplay() {
	return {
		restrict: 'E',
		scope: {
			critique: '='
		},
		controller: ['ApiService', '$sce', 'Auth', function(ApiService, $sce, Auth){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(critique){
				ctrl.critique = critique;
				ctrl.show = true;
			};
  	}],
		controllerAs: 'CritiqueCtrl',
		template: [
			'<div class="container">',
			  '<div class="critique hoverable z-depth-1">',
			    '<div class="blue-grey lighten-4">',
			     '<user-chip user-id="critique.critic_id"></user-chip>',
			    '</div>',
			    '<div class="critique-body">{{critique.body}}</div>',
			    '<critique-comments critique="critique"></critique-comments>',
			  '</div>',
			'</div>'
		].join(''),
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('critique', function (crit) {
	        if (crit!==undefined) {ctrl.load(crit); console.log(crit); }
	    });
		}
	};
}

angular
	.module('app')
	.directive('critiqueDisplay', critiqueDisplay);
