//// 'use strict';
// 
//angular
//  .module('app')
//  .controller('AuthLoginController', ['$rootScope', 'AuthService', '$state',
//      function($rootScope, AuthService, $state) {
//    $rootScope.currentUser = {
//      email: '',
//      password: ''
//    };
//
//    $scope.login = function() {
//      AuthService.login($rootScope.currentUser.username, $rootScope.currentUser.password)
//        .then(function() {
//          $state.go('app.home');
//        });
//    };
//  }])
//  .controller('AuthLogoutController', ['$rootScope', 'AuthService', '$state',
//      function($rootScope, AuthService, $state) {
//    AuthService.logout()
//      .then(function() {
//        $state.go('login');
//      });
//  }])
//  .controller('SignUpController', ['$rootScope', 'AuthService', '$state',
//      function($rootScope, AuthService, $state) {
//    $rootScope.currentUser = {
//      username: '',
//      password: ''
//    };
//
//    $scope.register = function() {
//      AuthService.register($rootScope.currentUser.username, $scope.currentUser.password)
//        .then(function() {
//          $state.transitionTo('sign-up-success');
//        });
//    };
//  }]);