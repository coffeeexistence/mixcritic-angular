function critiqueComments() {
	return {
		restrict: 'E',
		scope: {
			critique: '='
		},
		controller: function(ApiService, $sce, $scope){
			var ctrl =  this;
			ctrl.show = false;

			$scope.session = UserService.session;

			ctrl.load = function(critique){
				$scope.critique = critique;
			};

			$scope.loadComments = function(){
				routeParams = {
					revision: $scope.critique.revision_id,
					critique: $scope.critique.id
				}
				ApiService.critiqueComments.index(routeParams).then(function(res){
					$scope.comments = res.data
					ctrl.show = true;
				});
			};
  	},
		controllerAs: 'CommentsCtrl',
		template: [
			'<hr class="slim">',
			'<div class="container critique-comments">',
				'<div ng-click="loadComments();" ng-show="!CommentsCtrl.show" class="center-align"><a href="">Show Comments</a></div>',
				'<div ng-show="CommentsCtrl.show" class="slim-text center-align">Comments</div>',
		    '<ul ng-if="CommentsCtrl.show" ng-repeat="comment in comments track by comment.id" style="margin-bottom:5px;" class="collection">',
					'<li class="blue-grey lighten-4 "><user-chip user-id="comment.user_id"></user-chip></li>',
					'<li class="collection-item">{{comment.body}}</li>',
		    '</ul>',
				'<new-critique-comment ng-if="CommentsCtrl.show" critique="critique"></new-critique-comment>',
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
