angular
    .module('app', ['templates', 'ngSanitize', 'ui.router', 'Devise', 'ui.materialize', 'ngFileUpload', 'ngMessages'])
      .config(['$stateProvider', '$urlMatcherFactoryProvider', function($stateProvider, $urlMatcherFactoryProvider){
        $urlMatcherFactoryProvider.strictMode(false);
        $stateProvider

          .state('mixes', {
            url: '',
            template: '<mixes></mixes>'
          })

          .state('new_mix', {
            url: '/mix/new',
            template: '<new-mix></new-mix>',
            controller: ['$scope', function($scope, genres) {$scope.genres = genres.data}],
            resolve: {
              genres: function(ApiService) {
                return ApiService.genres.index();
              }
            }
          })

          .state('mix', {
            url: '/mix/:id',
            templateUrl: 'mix/mix_tpl.html',
            controller: 'MixController',
            controllerAs: 'MixCtrl',
            resolve: {
              mix: ['ApiService', '$stateParams', function (ApiService, $stateParams) {
                return ApiService.mixes.show($stateParams.id);
              }]
            }
          })

          .state('session_register', {
            url: '/register',
            templateUrl: 'auth/session_register_tpl.html',
            controller: 'RegistrationController',
            controllerAs: 'RegCtrl'
          })

          .state('session_new', {
            url: '/login',
            templateUrl: 'auth/session_new_tpl.html',
            controller: 'LoginController',
            controllerAs: 'LoginCtrl'
          });

        }]);
