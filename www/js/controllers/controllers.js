angular
  .module('app')
  .controller('TranslatorsController', ['$scope', '$http', 'Translator', function($scope, $http, Translator) {
    $scope.translators = [];
    // $http.
    // get('/api/Translators').
    // success(function(data) {
    //   console.log(JSON.stringify(data));
    //   //$scope.target = JSON.stringify(data);
    //     $scope.translators = data;
    // });
    function getAllTranslators() {
      Translator
        .find()
        .$promise
        .then(function(results) {
          $scope.allTranslators = results;
        });
    }
    getAllTranslators();
    
  }])

  .controller('TranslatorsSearchController', ['$scope', '$http', 'searchService',
                function($scope, $http, searchService) {
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
    get('api/Translators/?filter= {"where": { "language_combination.source": "'
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

.controller('TabController', ['$scope', function($scope) {
    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
    }])

.controller('ContactFormController', ['$scope', '$http', '$mdToast', '$animate',
    function($scope, $http, $mdToast, $animate) {
// Expose view variables
 
        $scope.toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
        $scope.getToastPosition = function () {
            return Object.keys($scope.toastPosition)
                .filter(function (pos) {
                    return $scope.toastPosition[pos];
                })
                .join(' ');
        };
 
        this.sendMail = function () {
 
            var data = ({
                contactName : this.contactName,
                contactEmail : this.contactEmail,
                contactMsg : this.contactMsg
            });
 
            // Simple POST request example (passing data) :
            $http.post('/contact-form', data).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
 
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Thanks for your message ' + data.contactName + ' You Rock!')
                            .position($scope.getToastPosition())
                            .hideDelay(5000)
                    );
 
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
 
        };
    }
]);

;


