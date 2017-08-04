/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as interfaces from "../../../../interfaces/index";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic/index";

/******************************************************************************/

class Middleware implements sharedLogicInterfaces.Middleware {

  /*****************************************************************/

    readonly retrieveMwareLists = ( mware : sharedLogicInterfaces.AppMiddleware , subject : string , subjectModule : interfaces.utilities.MiddlewareBorn ) : void => {
      if ( subjectModule.middleware.length ) {
        mware[ subject ] = [];
        subjectModule.middleware.forEach( function ( singleMW : express.RequestHandler ) {
          mware[ subject ].push( singleMW );
        } );
      }
    }

  /*****************************************************************/

}

/******************************************************************************/

export default () : sharedLogicInterfaces.Middleware => {
  return new Middleware();
}

/******************************************************************************/
