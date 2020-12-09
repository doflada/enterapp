'use strict';

angular.
  module('salarView').
  component('salarView', {
    templateUrl: 'salar-view/salar-view.template.html',
    controller: function SalarController($scope, $http, CurrentData) {
      this.userName = CurrentData.currdata.userName;

      $scope.salariati = [];

      const newluna = {
                        id: "NEW",
                        anul: "",
                        luna: "",
                        brut: "",
                        net: ""
                      };

      $scope.ids = "";
      $scope.numes = "";
      $scope.prens = "";
      $scope.emails = "";
      $scope.filtru = "";
      $scope.salsalarii = [];

      $http({
        method: 'GET',
        url: '/confs/salariatlist.php',
      }).then(function successCallback(response) {
        $scope.salariati = response.data;
      }, function errorCallback(response) {
        alert(response + " Eroare lista salariati!");
      });

      $scope.cursalariat = function(element) {
        let vids = element.children[0].innerText
        $scope.cursal = $scope.salariati.filter(x => x.id === vids);
        $scope.ids = vids;
        $scope.numes = $scope.cursal[0].nume;
        $scope.prens = $scope.cursal[0].prenume;
        $scope.emails = $scope.cursal[0].email;
        $scope.filtru = $scope.cursal[0].nume;

        $http({
          method: 'POST',
          url: '/confs/salsallist.php',
          data: {
            ids: vids,
          }
        }).then(function successCallback(response) {
          $scope.salsalarii = response.data;
        }, function errorCallback(response) {
          alert(response + " Eroare lista salarii!");
        });


      };

      $scope.cfiltru = function(filtru) {
        $scope.numes = filtru;
        $scope.filtru = filtru;
      };

      $scope.saveluna = function(cursalar) {
        if ( isNaN(parseFloat(cursalar.brut)) || isNaN(parseFloat(cursalar.net)) ) {
          alert("Eroare introducere date (brut/net/0) !");
        } else {
          $http({
            method: 'POST',
            url: '/confs/salarmod.php',
            data: {
              id: cursalar.id,
              ids: $scope.ids,
              anul: cursalar.anul,
              luna: cursalar.luna,
              brut: cursalar.brut,
              net: cursalar.net
            }
          }).then(function successCallback(response) {
            $scope.salsalarii = response.data;
          }, function errorCallback(response) {
            alert(response + " Eroare lista salarii!");
          });
        }

      }

      $scope.chbrut = function(cursalar, index) {
        $scope.salsalarii[index].net = parseFloat(cursalar.brut * 60/100).toString();
      }

      $scope.chnet = function(cursalar, index) {
        $scope.salsalarii[index].brut = parseFloat(cursalar.net * 100/60).toString();
      }

      $scope.delluna = function(cursalar) {

          $http({
            method: 'POST',
            url: '/confs/salardel.php',
            data: {
              id: cursalar.id,
              ids: $scope.ids,
            }
          }).then(function successCallback(response) {
            $scope.salsalarii = response.data;
          }, function errorCallback(response) {
            alert(response + " Eroare lista salarii!");
          });

      }

      $scope.adluna = function() {
        if ($scope.ids === "") {
          alert("Alege un angajat !");
        } else {
          let lunile = $scope.salsalarii.map(a => a.luna);
          let maxluna = lunile.reduce(function(x, y) {
            return Math.max(x, y);
          });
          let ani = $scope.salsalarii.map(a => a.anul);
          let maxan = ani.reduce(function(x, y) {
            return Math.max(x, y);
          });

          if (maxluna === "12" ) {
            newluna.anul = (parseInt(maxan)+1).toString();
            newluna.luna = "1";
          } else {
            newluna.anul = maxan;
            newluna.luna = (parseInt(maxluna) + 1).toString();
          }

          newluna.id = "NEW";
          newluna.brut = "";
          newluna.net = "";

          $scope.salsalarii.push(newluna);
        }
      }

      $scope.reset = function() {
        $scope.ids = "";
        $scope.numes = "";
        $scope.prens = "";
        $scope.emails = "";
        $scope.filtru = "";
        $scope.salsalarii = [];

      };


    }
  });
