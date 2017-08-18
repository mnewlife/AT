/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { CartProductMongooseModel } from "../../../../../../src/components/storage/mongodb/cart-product/model/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done: any ) => {

  CartProductMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
