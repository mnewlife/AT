/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { PriceModel, PriceMongooseModel } from "../../../../../../src/components/storage/mongodb/price/model/index";

import fixturesFactory from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( callback: any ) => {

  PriceMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      logger.debug( "Prep Error: " + JSON.stringify( err ) );
      return callback( null );
    }

    PriceMongooseModel.insertMany( fixturesFactory(), ( err: any, savedDocuments: PriceModel[] ) => {

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
