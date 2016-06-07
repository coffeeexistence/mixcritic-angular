function alerts() {
	return {
		restrict: 'E',
		scope: {
		},
		controller: ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout){
      var ctrl = this;

      $scope.alerts = {
        messages: {},
        show: function(){
          return (Object.keys(this.messages).length > 0);
        }
      };

      ctrl.addAlert = function(message) {
        var alertIndex = Object.keys($scope.alerts.messages).length + 1;
        $scope.alerts.messages[alertIndex] = message;
        $timeout(function(){
          delete $scope.alerts.messages[alertIndex];
        }, 4000);
      };

      $rootScope.$on('alert', function (event, data) {
        ctrl.addAlert(data);
      });

  	}],
		controllerAs: 'AlertsCtrl',
		template: [
      '<div class="card grey lighten-5" ng-show="alerts.show()">',
        '<div class="card-content">',
          '<div ng-repeat="alert in alerts.messages" class="centered">{{alert}}</div>',
        '</div>',
      '</div>'
		].join('')

	};
}

angular
	.module('app')
	.directive('alerts', alerts);
