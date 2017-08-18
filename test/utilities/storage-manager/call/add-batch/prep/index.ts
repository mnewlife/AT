/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { CallMongooseModel } from "../../../../../../src/components/storage/mongodb/call/model/index";

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
