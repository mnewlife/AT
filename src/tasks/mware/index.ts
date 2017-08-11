/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../interfaces";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

/******************************************************************************/

class Mware implements sharedLogicInterfaces.Mware {

  /*****************************************************************/

    readonly retrieveMwareLists = ( mware : sharedLogicInterfaces.AppMiddleware , subject : string , subjectModule : interfaces.components.MiddlewareBorn ) : void => {
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

export default () : sharedLogicInterfaces.Mware => {
  return new Mware();
}

/******************************************************************************/
