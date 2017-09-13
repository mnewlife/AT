( function () {

  "use strict";

  angular.module( "Ximex" , [
    "ngMaterial" ,
    "ngAnimate" ,
    "ngRoute" ,
    "ngMessages" ,
    "socket" ,
    "ads" , "ad" ,
    "enquiries" , "enquiry" ,
    "publishAd" , "publishEnquiry" ,
    "profile" , "editProfile" ,
    "myAds" , "myAd" ,
    "myEnquiries" , "myEnquiry" ,
    "chats" , "chat"
  ] );

  angular.module( "Ximex" ).config( [
    "$locationProvider" ,
    "$routeProvider" ,
    "$mdThemingProvider" ,
    function config ( $locationProvider , $routeProvider , $mdThemingProvider ) {

      $mdThemingProvider.theme( "default" )
        .primaryPalette( "indigo" , {
          'default' : '500',
          'hue-1' : '100',
          'hue-2' : '500',
          'hue-3' : '700'
        } )
        .accentPalette( "deep-orange" , {
          'default' : '400',
          'hue-1' : '100',
          'hue-2' : '500',
          'hue-3' : '700'
        } )
        .warnPalette( "red" );

      $routeProvider.
        when( "/ads" , {
          template : "<ads></ads>"
        } ).
        when( "/ads/:adId" , {
          template : "<ad></ad>"
        } ).
        when( "/enquiries" , {
          template : "<enquiries></enquiries>"
        } ).
        when( "/enquiries/:enquiryId" , {
          template : "<enquiry></enquiry>"
        } ).
        when( "/publish-ad" , {
          template : "<publish-ad></publish-ad>"
        } ).
        when( "/publish-ad/:adId" , {
          template : "<publish-ad></publish-ad>"
        } ).
        when( "/publish-enquiry" , {
          template : "<publish-enquiry></publish-enquiry>"
        } ).
        when( "/publish-enquiry/:enquiryId" , {
          template : "<publish-enquiry></publish-enquiry>"
        } ).
        when( "/profile" , {
          template : "<profile></profile>"
        } ).
        when( "/edit-profile" , {
          template : "<edit-profile></edit-profile>"
        } ).
        when( "/my-ads" , {
          template : "<my-ads></my-ads>"
        } ).
        when( "/my-ads/:adId" , {
          template : "<my-ad></my-ad>"
        } ).
        when( "/my-enquiries" , {
          template : "<my-enquiries></my-enquiries>"
        } ).
        when( "/my-enquiries/:enquiryId" , {
          template : "<my-enquiry></my-enquiry>"
        } ).
        when( "/chats" , {
          template : "<chats></chats>"
        } ).
        when( "/adChats/:adId" , {
          template : "<chats></chats>"
        } ).
        when( "/enquiryChats/:enquiryId" , {
          template : "<chats></chats>"
        } ).
        when( "/chats/:chatId" , {
          template : "<chat></chat>"
        } ).
        when( "/adChat/:adId" , {
          template : "<chat></chat>"
        } ).
        when( "/enquiryChat/:enquiryId" , {
          template : "<chat></chat>"
        } ).
        otherwise( "/ads" );

    }

  ] );

  angular.module( "Ximex" ).controller( "MainController" , controller );

  controller.$inject = [
    "Socket"
  ];

  function controller ( Socket ) {
    /* jshint validthis: true */
    var vm = this;

  }

} )();
