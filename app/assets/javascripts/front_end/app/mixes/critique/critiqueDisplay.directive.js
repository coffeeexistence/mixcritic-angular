function critiqueDisplay() {
	return {
		restrict: 'E',
		scope: {
			critique: '=',
			reloadCritiques: '&'
		},
		controller: ['ApiService', '$sce', 'Auth', '$scope', 'smoothScroll', '$stateParams', '$timeout',
		function(ApiService, $sce, Auth, $scope, smoothScroll, $stateParams, $timeout){
			var ctrl =  this;
			ctrl.show = false;
			
			
			ctrl.load = function(critique) {
				$scope.critique = critique;	
				ctrl.show = true;
			};

			ctrl.focus = function() {
				$timeout(function() {
					var critiqueElement = document.getElementById('critique-'+$scope.critique.id);
					console.log('scrolling to critique '+$scope.critique.id);
					smoothScroll(critiqueElement);
				});
			};

			if ($stateParams.critique_id) {
				if ($stateParams.critique_id == $scope.critique.id) { ctrl.focus() }
			}
			
			$scope.$watch('critique.focus', function (focus) {
	        	if (focus===true) {ctrl.focus(); console.log('focusing'); }
	    	})
			
			$scope.$watch('critique', function (critique) {
	        	if (critique!==undefined) {ctrl.load(critique)}
	   		});

  	}],
		controllerAs: 'CritiqueCtrl',
		template: [
			'<div ng-if="CritiqueCtrl.show" id="critique-{{critique.id}}" class="container">',
			  '<div class="critique hoverable z-depth-1">',
			    '<div class="blue-grey lighten-4">',
			     '<user-chip user-id="critique.critic_id"></user-chip>',
			    '</div>',
			    '<div class="critique-body">{{critique.body}}</div>',
			    '<critique-comments critique="critique"></critique-comments>',
			  '</div>',
			'</div>'
		].join('')
	};
}

angular
	.module('app')
	.directive('critiqueDisplay', critiqueDisplay);
