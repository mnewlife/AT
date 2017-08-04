/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../src/interfaces/index";

import { ContributionMongooseModel } from "../../../../../../src/utilities/storage-manager/mongodb/contribution/model/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( done: any ) => {

  ContributionMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
