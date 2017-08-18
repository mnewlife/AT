/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { PriceMongooseModel } from "../../../../../../src/components/storage/mongodb/price/model/index";

/******************************************************************************/

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done: any ) => {

  PriceMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
