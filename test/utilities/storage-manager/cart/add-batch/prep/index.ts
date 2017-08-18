/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { CartMongooseModel } from "../../../../../../src/components/storage/mongodb/cart/model/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done: any ) => {

  CartMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
