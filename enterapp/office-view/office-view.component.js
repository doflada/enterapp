'use strict';

angular.
  module('officeView').
  component('officeView', {
    templateUrl: 'office-view/office-view.template.html',
    controller: function OfficeController($scope, $http, CurrentData) {
      this.userName = CurrentData.currdata.userName;

      $scope.birouri = [];
      const newbirou = {
                            id: "NEW",
                            numebirou: "adauga birou nou"
                        };

      $scope.idb = "";
      $scope.numeb = "";
      $scope.filtru = "";

      $http({
        method: 'GET',
        url: '/confs/biroulist.php',
      }).then(function successCallback(response) {
        $scope.birouri = response.data;
        $scope.birouri.unshift(newbirou);
      }, function errorCallback(response) {
        alert(response + " Eroare lista birouri!");
      });

      $scope.curbirou = function(element) {
        let vidb = element.children[0].innerText
        let vidn = element.children[1].innerText
        $scope.idb = vidb;
        $scope.numeb = vidn;
        $scope.filtru = vidn;
      };

      $scope.cfiltru = function(filtru) {
        $scope.numeb = filtru;
        $scope.filtru = filtru;
      };

      $scope.reset = function() {
        $scope.idb = "";
        $scope.numeb = "";
        $scope.filtru = "";
      };

      $scope.modifica = function(numeb) {
        let vidb = $scope.idb;
        let vidn = numeb.trim();
        let obj = $scope.birouri.find(o => o.numebirou === vidn);
        if (vidn === "" || obj || $scope.idb === "") {
          alert("Eroare introducere date (unic/spatiu/alege) !");
        } else {
          $http({
            method: 'POST',
            url: '/confs/biroumod.php',
            data: {
              idb: vidb,
              numeb: vidn
            }
          }).then(function successCallback(response) {
            $scope.birouri = response.data;
            $scope.birouri.unshift(newbirou);
          }, function errorCallback(response) {
            alert(response + " Eroare lista birouri!");
          });
        }

        $scope.idb = "";
        $scope.numeb = "";
        $scope.filtru = "";

      }

    }
  });
