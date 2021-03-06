"use strict";

angular.module('angularMovieApp', ['ui.router', 'angularMovieUI', 'angularMovieCore', 'app.interceptors', 'pascalprecht.translate', 'ngCookies', 'ui.bootstrap']);

angular.module('angularMovieApp').config(function($stateProvider, $urlRouterProvider, MovieProvider, AuthProvider) {

  $stateProvider
    .state('home', {
      url         : '/home',
      templateUrl : 'partials/home.html',
      controller  : 'homeController'
    })
    .state('movie', {
      url         : '/movies/:id',
      templateUrl : 'partials/movie.html',
      controller  : 'movieController',
      resolve     : {
        movie : function($stateParams, Movie) {
          return Movie.fetchOne($stateParams.id);
        }
      }
    })
    .state('movies', {
      url         : '/movies',
      templateUrl : 'partials/movies.html',
      controller  : 'moviesController'
    })
    .state('editmovie', {
      url         : '/movies/edit/:id',
      templateUrl : 'partials/edit.html',
      controller  : 'editMovieController'
    });


  $urlRouterProvider.otherwise('/home');

  MovieProvider.setURI('/server/api/movies');
  AuthProvider.setURI('/server/auth');
});

angular.module('angularMovieApp').config(['$translateProvider', function($translateProvider) {
  "use strict";
  $translateProvider.useStaticFilesLoader({
    prefix : 'locales/',
    suffix : '.json'
  });
  $translateProvider.preferredLanguage('frFR');
}]);

