angular
    .module('app', ['templates', 'ngSanitize', 'ui.router'])
      .config(function($stateProvider){
        $stateProvider
          .state( 'mixes', {
            url: '',
            template: '<mixes></mixes>'
          })
          .state('mix', {
            url: '/mix/:id',
            templateUrl: 'mix/mix_template.html',
            controller: 'MixController',
            controllerAs: 'MixCtrl',
            resolve: {
              mix: function(ApiService, $stateParams){
                return ApiService.getMix($stateParams.id);
              }
            }

          });
        });
