angular.module('app.controllers', [])

.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $localStorage, $ionicPlatform,   AuthFactory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.registration = {};
    $scope.loggedIn = false;
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);
        //console.log("userinfo: "+ $localStorage.get('userinfo'));

        AuthFactory.login($scope.loginData);
        console.log("user_info: " +  $localStorage.getObject('userinfo','{}'));
        $scope.closeLogin();
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
      
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the login modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doRegister = function () {
        console.log('Doing registration', $scope.registration);
        $scope.loginData.username = $scope.registration.username;
        $scope.loginData.password = $scope.registration.password;

        AuthFactory.register($scope.registration);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };
       
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $localStorage.storeObject('userinfo',$scope.loginData);
    });
    
   
})

// implement the TranslatorsController and About Controller here

.controller('TranslatorsController', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    $scope.translators = [];
    //console.log("TRANS CONTR token: " +$localStorage.get('Token'));
     $http.
     get('http://0.0.0.0:3000/api/Translators').
     //get('http://translation-agency.mybluemix.net/api/Translators').
     success(function(data) {
       console.log(JSON.stringify(data));
       //$scope.target = JSON.stringify(data);
         console.log($scope.translators);
         $scope.translators = data;
     });
//    function getAllTranslators() {
//      Translator
//        .find()
//        .$promise
//        .then(function(results) {
//          $scope.allTranslators = results;
//        });
//    }
//    getAllTranslators();
    
  }])

.controller('TranslatorsSearchController', ['$scope', '$http', '$state', '$localStorage',
                function($scope, $http, $state, $localStorage) {
    $scope.submitTranslatorSearch = function () {
        console.log("going to search results");
          //$scope.goTo = function(){
        $localStorage.store('searchSourceLang', this.searchSourceLang);
        $localStorage.store('searchTargetLang', this.searchTargetLang);
        $localStorage.store('searchSpec', this.searchSpec);
        console.log("GETTING SORCE: " + $localStorage.get('searchSourceLang'));
        console.log("GETTING TARGET: " + $localStorage.get('searchTargetLang'));
        console.log("GETTING SPEC: " + $localStorage.get('searchSpec'));
          $state.go('app.search_results');
    //}
   };

    $http.
        //get('http://translation-agency.mybluemix.net/api/Translators/?filter= {"where": {
    get('http://0.0.0.0:3000/api/Translators/?filter= {"where": {"language_combination.source": "'
                                                    + $localStorage.get('searchSourceLang') + 
                                                    '", "language_combination.target": "'+ $localStorage.get('searchTargetLang') +
                                                    '", "specialization": "'+ $localStorage.get('searchSpec') +
                                                    '"} }').
        success(function(data) {
          console.log(JSON.stringify(data));
          //$scope.target = JSON.stringify(data);
            $scope.translators = data;
        });      


      }])

;
