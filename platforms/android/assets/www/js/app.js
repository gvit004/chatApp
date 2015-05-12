// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic', 'chat'])

    //.run(function ($ionicPlatform) {
    //    $ionicPlatform.ready(function () {
    //        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    //        // for form inputs)
    //        //if (window.cordova && window.cordova.plugins.Keyboard) {
    //        //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //        //}
    //        //if (window.StatusBar) {
    //        //    StatusBar.styleDefault();
    //        //}
    //    });
    //})

    .factory('socket', function ($rootScope) {
        var socket = io('http://0.0.0.0:32771');
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        }
    });