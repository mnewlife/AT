/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { CartModel , CartMongooseModel } from "../../../../../../src/components/storage/mongodb/cart/model/index";

import fixtures from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( callback : any ) => {

  CartMongooseModel.remove( {} , ( err ) => {

    if ( err ) {
logger.debug( "Prep Error: " + JSON.stringify( err ) );
return callback( null );
    }

    CartMongooseModel.insertMany( fixturesFactory() , ( err : any , savedDocuments : CartModel[] ) => {

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
