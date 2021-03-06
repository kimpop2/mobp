/*
 * Copyright (c) 2014, COPYRIGHTⓒ2014 eBiz-Pro. ALL RIGHTS RESERVED.
 *
 */
// Ionic Starter App

angular.module('underscore', [])
    .factory('_', function() {
        return window._; // assumes underscore has already been loaded on the page
    });

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', [
    'ionic',
    'angularMoment',
    'underscore',
    'ngResource',
    'ngCordova',
    'slugifier',

    'mobp.controllers',
    'mobp.directives',
    //'mobp.services',
    //'mobp.factories',
    'mobp.filters',
    'mobp.views',

    'mobp.auth',
    'mobp.home',
    'mobp.config',
    'mobp.salary',
    'mobp.duty'

])

.run(function($ionicPlatform, AuthService, $ionicPopup, $state, $rootScope, $ionicConfig, $timeout) {
//.run(function($ionicPlatform, PushNotificationsService, AuthService, $ionicPopup, $state, $rootScope, $ionicConfig, $timeout) {

    $ionicPlatform.on("deviceready", function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        
        // 서버로 데이타 요청 시 네트웍 연결확인
        /*
        if (window.cordova) {
            if (!$rootScope.isOnline) {
                $ionicPopup.alert({
                    title: '네트웍 연결 확인',
                    template: '네트웍 연결이 되지 않았습니다. 확인하시기 바랍니다.'
                });

                event.preventDefault();
                $state.go($state.current, {}, {
                    reload: true
                });
            }
        }
        */
        //PushNotificationsService.register();
    });

    $ionicPlatform.registerBackButtonAction(function(event) {

        if ($state.is('auth.walkthrough') || $state.is('auth.login')) {
            $ionicPopup.confirm({
                title: '종료 확인',
                template: '종료 하시겠습니까?'
            }).then(function(res) {
                if (res) {
                    ionic.Platform.exitApp();
                }
            });
            
        } else if ($state.is('app.home')) {
            $ionicPopup.confirm({
                title: '로그아웃 확인',
                template: '로그아웃 하시겠습니까?'
            }).then(function(res) {
                if (res) {
                    AuthService.logout();
                    $state.go('auth.login');
                }
            });
        } else {
            navigator.app.backHistory();
        }
    }, 100);

    // This fixes transitions for transparent background views
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf('auth.walkthrough') > -1) {
            // set transitions to android to avoid weird visual effect in the walkthrough transitions
            $timeout(function() {
                $ionicConfig.views.transition('android');
                $ionicConfig.views.swipeBackEnabled(false);
                console.log("setting transition to android and disabling swipe back");
            }, 0);
        } else {
            if (!AuthService.isAuthenticated()) {

                if (toState.name !== 'auth.login' && toState.name !== 'auth.signup' && toState.name !== 'auth.forgot-password') {
                    event.preventDefault();

                    $state.go('auth.walkthrough');
                    var alertPopup = $ionicPopup.alert({
                        title: '인증에러',
                        template: '인증기한이 만료되었습니다. 다시 로그인 하십시오.'
                    });

                }
            }
        }
    });

    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf('app.feeds-categories') > -1) {
            // Restore platform default transition. We are just hardcoding android transitions to auth views.
            $ionicConfig.views.transition('platform');
            // If it's ios, then enable swipe back again
            if (ionic.Platform.isIOS()) {
                $ionicConfig.views.swipeBackEnabled(true);
            }
            console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
        }
    });

    /*
    $ionicPlatform.on("resume", function() {
        PushNotificationsService.register();
    });
    */

})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/auth/login');
    
    $stateProvider
    //INTRO
    .state('auth', {
        url: "/auth",
        templateUrl: "views/auth/auth.html",
        abstract: true,
        controller: 'AuthCtrl'
    })
    .state('auth.walkthrough', {
        url: '/walkthrough',
        templateUrl: "views/auth/walkthrough.html"
    })
    .state('auth.login', {
        url: '/login',
        params: {
            user: null
        },
        templateUrl: "views/auth/login.html",
        controller: 'LoginCtrl'
    })
    .state('auth.signup', {
        url: '/signup',
        templateUrl: "views/auth/signup.html",
        controller: 'SignupCtrl'
    })
    .state('auth.forgot-password', {
        url: "/forgot-password",
        templateUrl: "views/auth/forgot-password.html",
        controller: 'ForgotPasswordCtrl'
    })
    // cache: false , when login app reload
    .state('app', {
        url: "/app",
        abstract: true,
        cache: false,
        templateUrl: "views/side-mobp.html",
        controller: 'AppCtrl'
    })
    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "views/home.html",
                controller: "HomeCtrl"
            }
        }
    })
    .state('app.salary-months', {
        url: "/salary/salary-months/:year",
        views: {
            'menuContent': {
                templateUrl: "views/salary-months.html",
                controller: "SalaryMonthsCtrl"
            }
        }
        
    })
    .state('app.salary', {
        url: "/salary/salary/:month",
        views: {
            'menuContent': {
                templateUrl: "views/salary.html",
                controller: "SalaryCtrl"
            }
        }
    })
    .state('app.dailyduty', {
        url: "/duty/dailyduty/",
        views: {
            'menuContent': {
                templateUrl: "views/duty.html",
                controller: "DutyCtrl",
            }
        }
    });
    /* 예비기능
    .state('app.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "views/settings.html",
                controller: 'SettingsCtrl'
            }
        }
    })
    .state('app.profile', {
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: "views/profile.html"
            }
        }
    })
    */

});
