angular
    .module('app', ['templates', 'ngSanitize', 'ui.router', 'Devise'])
      .config(function($stateProvider, $urlMatcherFactoryProvider){
        $urlMatcherFactoryProvider.strictMode(false);
        $stateProvider

          .state('mixes', {
            url: '',
            template: '<mixes></mixes>'
          })

          .state('new_mix', {
            url: '/mix/new',
            templateUrl: 'mix/new_mix_template.html',
            controller: 'NewMixController',
            controllerAs: 'NewMixCtrl'
          })

          .state('mix', {
            url: '/mix/:id',
            templateUrl: 'mix/mix_template.html',
            controller: 'MixController',
            controllerAs: 'MixCtrl',
            resolve: {
              mix: function (ApiService, $stateParams) {
                return ApiService.mixes.show($stateParams.id);
              }
            }
          })

          .state('session_register', {
            url: '/register',
            templateUrl: 'auth/session_register_template.html',
            controller: 'RegistrationController',
            controllerAs: 'RegCtrl'
          })

          .state('session_new', {
            url: '/login',
            templateUrl: 'auth/session_new_template.html',
            controller: 'LoginController',
            controllerAs: 'LoginCtrl'
          });

        });
