angular
    .module('app', ['templates', 
    'ngSanitize', 
    'ui.router', 
    'Devise', 
    'ngMaterial', 
    'ngFileUpload',
     'ngMessages', 
     'smoothScroll', 
     'angularUtils.directives.dirPagination', 
     'ng-resource-manager'
     ])
      .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$mdThemingProvider',
      function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $mdThemingProvider){
        
        
        $mdThemingProvider.definePalette('min', {
          '50':  '050505',
          '100': '2B2B2B',
          
          '200': '2B2B2B',
          '300': '2B2B2B',
          
          '400': '050505',
          '500': 'FAFAFA',
          
          '600': 'FAFAFA',
          '700': 'D3D3D3',
          
          '800': 'C6C6C6',
          '900': 'B7B7B7',
          
          'A100': '2B2B2B',
          'A200': 'FAFAFA',
          'A400': 'FAFAFA',
          'A700': 'd5d5d5',
          'contrastDefaultColor': 'dark',    // whether, by default, text (contrast)
                                              // on this palette should be dark or light
          'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
          '200', '300', '400', 'A100'],
          'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        
        $mdThemingProvider.theme('default')
          .primaryPalette('min', {
            'default': '400', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
          })
          .accentPalette('blue-grey');
        
        $urlMatcherFactoryProvider.strictMode(false);
        $urlRouterProvider.otherwise('');
        $stateProvider

          .state('mixes', {
            url: '',
            template: '<mixes></mixes>'
          })

          .state('facebookLoginSuccessful', {
            url: '/_=_',
            template: '<mixes></mixes>'
          })

          .state('new_mix', {
            url: '/mix/new',
            template: '<new-mix></new-mix>',
            controller: ['$scope', 'genres', function($scope, genres) {$scope.genres = genres.data}],
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

          .state('critique', {
            url: '/mix/:id/critique/:critique_id',
            templateUrl: 'mix/mix_tpl.html',
            controller: 'MixController',
            controllerAs: 'MixCtrl',
            resolve: {
              mix: ['ApiService', '$stateParams', function (ApiService, $stateParams) {
                return ApiService.mixes.show($stateParams.id);
              }]
            }
          })

          .state('userProfile', {
            url: '/user/:id',
            templateUrl: 'user/profile_tpl.html',
            controller: 'UserProfileController',
            controllerAs: 'ProfileCtrl',
            resolve: {
              user: ['ApiService', '$stateParams', function (ApiService, $stateParams) {
                return ApiService.users.profile($stateParams.id);
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
