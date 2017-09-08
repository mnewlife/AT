/******************************************************************************/

import * as express from "express";

import * as interfaces from "../interfaces";
import * as root from "../../../../interfaces";
import * as components from "../../../../components/interfaces";

/******************************************************************************/

export default class Mware implements interfaces.Instance {

  /*****************************************************************/

  readonly retrieveMwareLists = ( interfaces: root.AppMiddleware, subject: string, subjectModule: components.MiddlewareBorn ): void => {
    if ( subjectModule.middleware.length ) {
      interfaces[ subject ] = [];
      subjectModule.middleware.forEach( function ( singleMW: express.RequestHandler ) {
        interfaces[ subject ].push( singleMW );
      } );
    }
  }

  /*****************************************************************/

}

/******************************************************************************/
