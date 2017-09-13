/*******************************************************************/

/// <reference path="..\..\..\..\node_modules\@types\angular\index.d.ts"/>
/// <reference path="..\..\..\..\node_modules\@types\angular-route\index.d.ts"/>

/*******************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "./interfaces";

/*******************************************************************/

( () => {

  "use strict";

  angular.module( "toast", [] );

  angular.module( "toast" ).factory( "Toast", ToastService );

  ToastService.$inject = [ "$mdToast" ];

  function ToastService ( $mdToast: ng.material.IToastService ): interfaces.Instance {

    /***************************************************/

    return {
      showSimple: showSimple,
      showWithAction: showWithAction
    };

    /***************************************************/

    function showSimple ( message: string ): Promise<void> {

      return new Promise<void>(( resolve, reject ) => {

        let simpleToast = $mdToast.simple()
          .textContent(( message ) ? message : "" )
          .hideDelay( 3000 );

        $mdToast.show( simpleToast )
          .then(( response: any ) => {

            resolve();

          } );

      } );

    }

    /***************************************************/

    function showWithAction ( message: string, action: string ): Promise<boolean> {

      return new Promise<boolean>(( resolve, reject ) => {

        let toast = $mdToast.simple()
          .textContent( message )
          .action( action )
          .highlightAction( false );

        $mdToast.show( toast )
          .then(( response: any ) => {

            if ( response == "ok" ) {
              return resolve( true );
            } else {
              return resolve( false );
            }

          } );

      } );

    }

    /***************************************************/

  }

} )();