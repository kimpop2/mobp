/*
 * Copyright (c) 2014, COPYRIGHTⓒ2014 eBiz-Pro. ALL RIGHTS RESERVED.
 *
 */
angular.module('mobp.home', ['ngResource', 'mobp.config'])

.controller('HomeCtrl', function($scope, $http, $state, AuthService, AUTH_PATH, USER_ROLES) {

    $scope.home_programs = [];

    $http.get('home-programs.json').success(function(response) {

        $scope.home_programs = response;
    });

    $scope.destroySession = function() {
        AuthService.logout();
    };

});
