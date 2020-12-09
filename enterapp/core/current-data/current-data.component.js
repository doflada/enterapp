'use strict';

angular.
  module('core.currentData').
  factory('CurrentData', function() {
    return {
      currdata: {
        userName: "",
        firstName: "",
        lastName: "",
        email:""
      },
      update: function(user, first, last, email) {
         this.currdata.userName = user;
         this.currdata.firstName = first;
         this.currdata.lastName = last;
         this.currdata.email = email;
       }
     };
   });
