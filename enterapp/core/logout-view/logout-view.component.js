'use strict';

angular.
  module('core.logoutView').
  component('core.logoutView', {
    templateUrl: 'core/logout-view/logout-view.template.html',
    controller: function LogoutController($scope, CurrentData) {
      this.currdata = CurrentData.currdata;

    }
  });
