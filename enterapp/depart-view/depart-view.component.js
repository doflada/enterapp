'use strict';

angular.
  module('departView').
  component('departView', {
    templateUrl: 'depart-view/depart-view.template.html',
    controller: function DepartamentController($scope, $http, CurrentData) {
      this.userName = CurrentData.currdata.userName;

      $scope.departamente = [];
      const newdepartament = {
                            id: "NEW",
                            numedepartament: "adauga departament nou"
                        };

      $scope.idd = "";
      $scope.numed = "";
      $scope.filtru = "";
      $scope.birouriasociate = [];
      $scope.origbirasoc =[];

      $http({
        method: 'GET',
        url: '/confs/departamentlist.php',
      }).then(function successCallback(response) {
        $scope.departamente = response.data;
        $scope.departamente.unshift(newdepartament);
      }, function errorCallback(response) {
        alert(response + " Eroare lista departamente!");
      });

      $http({
        method: 'GET',
        url: '/confs/biroulist.php',
      }).then(function successCallback(response) {
        $scope.birouri = response.data;
      }, function errorCallback(response) {
        alert(response + " Eroare lista birouri!");
      });

      $scope.curdepart = function(element) {
        let vidd = element.children[0].innerText
        let vidn = element.children[1].innerText
        $scope.idd = vidd;
        $scope.numed = vidn;
        $scope.filtru = vidn;
        $scope.origbirasoc = [];

        $http({
          method: 'POST',
          url: '/confs/birdeplist.php',
          data: {
            idd: vidd,
          }
        }).then(function successCallback(response) {
          $scope.birouriasociate = response.data;
          $scope.origbirasoc = response.data;
        }, function errorCallback(response) {
          alert(response + " Eroare lista birouri asociate!");
        });

      };

      $scope.cfiltru = function(filtru) {
        $scope.numed = filtru;
        $scope.filtru = filtru;
      };

      $scope.reset = function() {
        $scope.idd = "";
        $scope.numed = "";
        $scope.filtru = "";
        $scope.birouriasociate = [];
        $scope.origbirasoc =[];
      };

      $scope.modifica = function(numed) {
        let vidd = $scope.idd;
        let vidn = numed.trim();
        let obj = $scope.departamente.find(o => ((o.numedepartament === vidn) && (o.id != vidd)));
        let modib = $scope.birouriasociate === $scope.origbirasoc;
        if ((vidn === "") || (obj && modib) || ($scope.idd === "")) {
          alert("Eroare introducere date (unic/spatiu/alege) !");
        } else {
          let iduribir = $scope.birouriasociate.map(a => a.id);
          $http({
            method: 'POST',
            url: '/confs/departamentmod.php',
            data: {
              idd: vidd,
              numed: vidn,
              birouriasociate: iduribir
            }
          }).then(function successCallback(response) {
            $scope.departamente = response.data;
            $scope.departamente.unshift(newdepartament);
          }, function errorCallback(response) {
            alert(response + " Eroare lista departamente!");
          });
        }

        $scope.idd = "";
        $scope.numed = "";
        $scope.filtru = "";
        $scope.birouriasociate = [];
        $scope.origbirasoc =[];

      }

    }
  });
