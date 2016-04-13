angular
    .module('app', ['templates', 'ngSanitize', 'ui.router', 'Devise'])
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
          })
          .state('register', {
            url: '/register',
            templateUrl: 'auth/registration_template.html',
            controller: 'RegistrationController',
            controllerAs: 'RegCtrl',
          });
        });
