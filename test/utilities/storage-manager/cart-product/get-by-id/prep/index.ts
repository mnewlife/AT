/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { CartProductModel , CartProductMongooseModel } from "../../../../../../src/components/storage/mongodb/cart-product/model/index";

import fixtures from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( callback : any ) => {

  CartProductMongooseModel.remove( {} , ( err ) => {

    if ( err ) {
logger.debug( "Prep Error: " + JSON.stringify( err ) );
return callback( null );
    }

    CartProductMongooseModel.insertMany( fixturesFactory() , ( err : any , savedDocuments : CartProductModel[] ) => {

      if ( err ) {
logger.debug( "Prep Error: " + JSON.stringify( err ) );
callback( null );
      } else {
        callback( savedDocuments );
      }

    } );

  } );

}

/******************************************************************************/
