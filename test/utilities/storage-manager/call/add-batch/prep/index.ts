/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../src/interfaces/index";

import { CallMongooseModel } from "../../../../../../src/utilities/storage-manager/mongodb/call/model/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done: any ) => {

  CallMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
