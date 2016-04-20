function mixes() {
	return {
		restrict: 'E',
		scope: {
		},
		controller: function(ApiService, $attrs, $scope, $sce){
			var mixes =  this;

			$scope.search = {
				stringQuery: '',
				genre_id: '',
				sortBy: 'id'
			};

			mixes.loadData = function(){
				ApiService.mixes.index().then(function(res){
					mixes.mixes = res.data;
				});
				ApiService.genres.index().then(function(res){
					$scope.genres = res.data;
				});
			}

			mixes.hello = function(){
				debugger;
			};

			mixes.loadData();
  	},
		controllerAs: 'mixes',
		templateUrl: 'mix/mix_index.tpl.html'

	};
}

angular
	.module('app')
	.directive('mixes', mixes);
