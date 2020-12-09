'use strict';

angular.
  module('registerView').
  component('registerView', {
    templateUrl: 'register-view/register-view.template.html',
    controller: function RegisterController($scope, $http, $location, CurrentData) {

      $scope.master = {};
      $scope.currdata = CurrentData.currdata;

      $scope.adding = function(user) {

        if ( Object.values(user).length === 5 ) {

          $http({
            method: 'POST',
            url: '/confs/uniquser.php',
            data: {
              data: user
            }
          }).then(function successCallback(response) {
            if ( response.data.length > 0 ) {
               alert(" Error register!");
             } else {
                 $http({
                   method: 'POST',
                   url: '/confs/adduser.php',
                   data: {
                     data: user
                   }
                 }).then(function successCallback(response) {
                   if ( response.data.length === 1 ) {
                      $scope.master = angular.copy(user);
                      CurrentData.update(response.data[0].username,
                                         response.data[0].prenume,
                                         response.data[0].nume,
                                         response.data[0].email);

                      $location.path( "/office-view" );
                    }
                 }, function errorCallback(response) {
                   alert(response + " Error register!");
                 });
             }
          }, function errorCallback(response) {
            alert(response + " Error register!");
          });

        } else {
          alert('Please submit all information!');
        }

      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();

    }

  });
