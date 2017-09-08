/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { ShopModel, ShopMongooseModel } from "../../../../../../src/components/storage/mongodb/shop/model/index";

import fixtures from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( callback: any ) => {

  ShopMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      logger.debug( "Prep Error: " + JSON.stringify( err ) );
      return callback( null );
    }

    ShopMongooseModel.insertMany( fixturesFactory(), ( err: any, savedDocuments: ShopModel[] ) => {

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
