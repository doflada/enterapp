'use strict';

angular.
  module('angajatView').
  component('angajatView', {
    templateUrl: 'angajat-view/angajat-view.template.html',
    controller: function AngajatController($scope, $http, CurrentData) {
      this.userName = CurrentData.currdata.userName;

      $scope.salariati = [];
      $scope.departamente = [];
      $scope.birouriasociate = [];

      const newsalariat = {
                            id: "NEW",
                            nume: "adauga",
                            prenume: "salariat",
                            email: "nou",
                            datanasterii: "",
                            iddep: "",
                            idbir: "",
                            isman: 0
                        };

      $scope.ids = "";
      $scope.numes = "";
      $scope.prens = "";
      $scope.emails = "";
      $scope.datas = "";
      $scope.iddep = "";
      $scope.idbir = "";
      $scope.departs = "";
      $scope.curbirasoc = "";
      $scope.birous = "";
      $scope.mans = false;
      $scope.filtru = "";

      $http({
        method: 'GET',
        url: '/confs/salariatlist.php',
      }).then(function successCallback(response) {
        $scope.salariati = response.data;
        $scope.salariati.unshift(newsalariat);
      }, function errorCallback(response) {
        alert(response + " Eroare lista salariati!");
      });

      $http({
        method: 'GET',
        url: '/confs/departamentlist.php',
      }).then(function successCallback(response) {
        $scope.departamente = response.data;
      }, function errorCallback(response) {
        alert(response + " Eroare lista departamente!");
      });

      $http({
        method: 'GET',
        url: '/confs/birasoclist.php',
      }).then(function successCallback(response) {
        $scope.birouriasociate = response.data;
      }, function errorCallback(response) {
        alert(response + " Eroare lista departamente!");
      });

      $scope.cursalariat = function(element) {
        let vids = element.children[0].innerText
        $scope.cursal = $scope.salariati.filter(x => x.id === vids);
        $scope.ids = vids;
        $scope.numes = $scope.cursal[0].nume;
        $scope.prens = $scope.cursal[0].prenume;
        $scope.emails = $scope.cursal[0].email;
        $scope.datas = new Date($scope.cursal[0].datanasterii);
        $scope.iddep = $scope.cursal[0].iddep;
        $scope.idbir = $scope.cursal[0].idbir;
        $scope.mans = $scope.cursal[0].isman;
        if ($scope.mans === "1") {
          $scope.mans = true;
        } else {
          $scope.mans = false;
        }
        $scope.filtru = $scope.cursal[0].nume;

        $scope.departs = $scope.departamente.filter(x => x.id === $scope.iddep)[0];
        $scope.curbirasoc = $scope.birouriasociate.filter(x => x.iddep === $scope.iddep);
        $scope.birous = $scope.curbirasoc.filter(x => x.id === $scope.idbir)[0];

      };

      $scope.cfiltru = function(filtru) {
        $scope.numes = filtru;
        $scope.filtru = filtru;
      };

      $scope.depchange = function() {
        $scope.idbir = "";
        $scope.mans = false;
        $scope.iddep = $scope.departs.id;
        $scope.curbirasoc = $scope.birouriasociate.filter(x => x.iddep === $scope.iddep);
        $scope.birous = $scope.curbirasoc.filter(x => x.id === $scope.idbir)[0];
      }

      $scope.birchange = function() {
        $scope.idbir = $scope.birous.id;
      }

      $scope.reset = function() {
        $scope.ids = "";
        $scope.numes = "";
        $scope.prens = "";
        $scope.emails = "";
        $scope.datas = "";
        $scope.iddep = "";
        $scope.idbir = "";
        $scope.departs = "";
        $scope.curbirasoc = "";
        $scope.birous = "";
        $scope.mans = false;
        $scope.filtru = "";
      };

      $scope.modifica = function(numes) {
        let vids = $scope.ids;
        let vidn = numes.trim();
        let vidp = $scope.prens.trim();
        let vide = "";
        if ($scope.emails) {
          vide = $scope.emails.trim();
        };
        let viddata = $scope.datas;
        let viddep = $scope.iddep;
        let vidbir = $scope.idbir;
        let vidman = $scope.mans;
        if ($scope.mans === true) {
          vidman = 1;
        } else {
          vidman = 0;
        };

        let obj = $scope.salariati.find(o => ( ( (o.nume+o.prenume+o.email) === (vidn+vidp+vide) ) && (o.id != vids) ) );
        if ((vidn === "") || (vidp === "") || (vide === "") || (obj) || (vids === "")) {
          alert("Eroare introducere date (unic/spatiu) !");
        } else {
          $http({
            method: 'POST',
            url: '/confs/salariatmod.php',
            data: {
              ids: vids,
              numes: vidn,
              prens: vidp,
              emails: vide,
              datas: viddata,
              iddeps: viddep,
              idbirs: vidbir,
              mans: vidman
            }
          }).then(function successCallback(response) {
            $scope.salariati = response.data;
            $scope.salariati.unshift(newsalariat);
          }, function errorCallback(response) {
            alert(response + " Eroare lista salariati!");
          });
        }

        $scope.ids = "";
        $scope.numes = "";
        $scope.prens = "";
        $scope.emails = "";
        $scope.datas = "";
        $scope.iddep = "";
        $scope.idbir = "";
        $scope.departs = "";
        $scope.curbirasoc = "";
        $scope.birous = "";
        $scope.mans = false;
        $scope.filtru = "";

      }

    }
  });
