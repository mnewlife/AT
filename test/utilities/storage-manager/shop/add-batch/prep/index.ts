/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { ShopMongooseModel } from "../../../../../../src/components/storage/mongodb/shop/model/index";

/******************************************************************************/

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done: any ) => {

  ShopMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
