angular
  .module('app')
  .factory('AuthService', ['Customer', '$q', '$rootScope', function(Customer, $q,
      $rootScope) {
    function login(email, password) {
      return Customer
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
          console.log("current user id: " + $rootScope.currentUser.id);
        });
    }

    function logout() {
      return Customer
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(email, password) {
      return Customer
        .create({
         email: email,
         password: password,
         created: new Date()
       })
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);