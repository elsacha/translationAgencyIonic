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
    console.log("TRANS CONTR token: " +$localStorage.get('Token'));
     $http.
     //get('http://0.0.0.0:3000/api/Translators').
     get('http://translation-agency.mybluemix.net/api/Translators').
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

.controller('TranslatorsSearchController', ['$scope', '$http', 'searchService', '$state',
                function($scope, $http, searchService, $state) {
    $scope.submitTranslatorSearch = function () {
        console.log("going to search results");
          //$scope.goTo = function(){
          $state.go('app.search_results');
    //}
   };
    $scope.searchSourceLang =  searchService.searchSourceLang;
      
    $scope.$watch('searchSourceLang', function() {
       searchService.searchSourceLang = $scope.searchSourceLang; 
    });

    $scope.searchTargetLang =  searchService.searchTargetLang;
      
    $scope.$watch('searchTargetLang', function() {
       searchService.searchTargetLang = $scope.searchTargetLang; 
    });

    $scope.searchSpec =  searchService.searchSpec;

    $scope.$watch('searchSpec', function() {
       searchService.searchSpec = $scope.searchSpec; 
    });
    
    $http.
        get('http://translation-agency.mybluemix.net/api//Translators/?filter= {"where": { "language_combination.source": "'
                                                    + $scope.searchSourceLang + 
                                                    '", "language_combination.target": "'+ $scope.searchTargetLang +
                                                    '", "specialization": "'+ $scope.searchSpec +
                                                    '"} }').
        success(function(data) {
          console.log(JSON.stringify(data));
          //$scope.target = JSON.stringify(data);
            $scope.translators = data;
        });      


      }])


// implement the IndexController and About Controller here

//.controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL) {
//    
//    $scope.baseURL = baseURL;
//    corporateFactory.query({
//            featured: "true"
//        },
//            function (response) {
//                var leaders = response;
//                $scope.leader = leaders[0];
//                $scope.showLeader = true;
//            },
//            function (response) {
//                $scope.message = "Error: " + response.status + " " + response.statusText;
//            }
//        );
//    menuFactory.query({
//            featured: "true"
//        },
//            function (response) {
//                var dishes = response;
//                $scope.dish = dishes[0];
//                $scope.showDish = true;
//            },
//            function (response) {
//                $scope.message = "Error: " + response.status + " " + response.statusText;
//            }
//        );
//    promotionFactory.query({
//        featured: "true"
//    },
//            function (response) {
//                var promotions = response;
//                $scope.promotion = promotions[0];
//                $scope.showPromotion = true;
//            },
//            function (response) {
//                $scope.message = "Error: " + response.status + " " + response.statusText;
//            }
//        );
//
//}])

//.controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', function ($scope, corporateFactory, baseURL) {
//
//    $scope.baseURL = baseURL;
//    $scope.leaders = corporateFactory.query();
//
//}])
//
//.controller('FavoritesController', ['$scope', '$state', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$ionicPlatform', '$cordovaVibration', function ($scope, $state, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $ionicPlatform, $cordovaVibration) {
//
//    $scope.baseURL = baseURL;
//    $scope.shouldShowDelete = false;
//
//    favoriteFactory.query(
//        function (response) {
//            $scope.dishes = response.dishes;
//            $scope.showMenu = true;
//        },
//        function (response) {
//            $scope.message = "Error: " + response.status + " " + response.statusText;
//        });
//    console.log($scope.dishes);
// 
//
//    $scope.toggleDelete = function () {
//        $scope.shouldShowDelete = !$scope.shouldShowDelete;
//        console.log($scope.shouldShowDelete);
//    }
//
//    $scope.deleteFavorite = function (dishid) {
//
//        var confirmPopup = $ionicPopup.confirm({
//            title: '<h3>Confirm Delete</h3>',
//            template: '<p>Are you sure you want to delete this item?</p>'
//        });
//
//        confirmPopup.then(function (res) {
//            if (res) {
//                console.log('Ok to delete');
//                favoriteFactory.delete({id: dishid});
//         
//               $state.go($state.current, {}, {reload: true});
//               // $window.location.reload();
//            } else {
//                console.log('Canceled delete');
//            }
//        });
//        $scope.shouldShowDelete = false;
//
//
//    }
//
//}])

;
