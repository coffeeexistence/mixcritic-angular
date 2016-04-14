function critiqueComments() {
	return {
		restrict: 'E',
		scope: {
			critique: '='
		},
		controller: function(ApiService, $sce, $scope){
			var ctrl =  this;
			ctrl.show = false;

			ctrl.load = function(critique){
				$scope.critique = critique;
			};

			ctrl.loadComments = function(){
				ApiService.getCritiqueComments($scope.critique.id).then(function(res){
					$scope.comments = res.data
					ctrl.show = true;
				});
			};
  	},
		controllerAs: 'CommentsCtrl',
		template: [
			'<hr class="slim">',
			'<div class="container critique-comments">',
				'<div ng-click="CommentsCtrl.loadComments();" ng-show="!CommentsCtrl.show" class="center-align"><a href="">Show Comments</a></div>',
				'<div ng-show="CommentsCtrl.show" class="slim-text center-align">Comments</div>',
		    '<ul ng-if="CommentsCtrl.show" ng-repeat="comment in comments" style="margin-bottom:5px;" class="collection">',
					'<li class="blue-grey lighten-4 "><user-chip user-id="comment.user_id"></user-chip></li>',
					'<li class="collection-item">{{comment.body}}</li>',
		    '</ul>',
			'</div>'
		].join(''),
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch('critique', function (critique) {
	        if (critique!==undefined) {ctrl.load(critique); console.log(critique); }
	    });
		}
	};
}

angular
	.module('app')
	.directive('critiqueComments', critiqueComments);
