/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { ProductMongooseModel } from "../../../../../../src/components/storage/mongodb/product/model/index";

/******************************************************************************/

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done: any ) => {

  ProductMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
