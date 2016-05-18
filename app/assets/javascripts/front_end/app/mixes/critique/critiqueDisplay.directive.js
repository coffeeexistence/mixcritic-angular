function critiqueDisplay() {
	return {
		restrict: 'E',
		scope: {
			critique: '=',
			reloadCritiques: '&'
		},
		controller: ['ApiService', '$sce', 'Auth', '$scope', '$document', function(ApiService, $sce, Auth, $scope, $document){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(critique){
				// ctrl.critique = critique;
				ctrl.show = true;
			};

			ctrl.focus = function(){
				var offset = 30;
				var duration = 1000;
				var critiqueElement = angular.element(document.getElementById('critique-'+$scope.critique.id));
				// var top = $(critiqueElement).offset().top;
				$document.duScrollTo(critiqueElement, offset, duration);
			};

  	}],
		controllerAs: 'CritiqueCtrl',
		template: [
			'<div id="critique-{{critique.id}}" class="container">',
			'<button ng-click="CritiqueCtrl.focus()">focus</button>',
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
	        if (crit!==undefined) { ctrl.load(crit) }
	    });
			scope.$watch('critique.focus', function (focus) {
	        if (focus===true) {ctrl.focus(); console.log('focusing'); }
	    });
		}
	};
}

angular
	.module('app')
	.directive('critiqueDisplay', critiqueDisplay);
