/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { ProductModel, ProductMongooseModel } from "../../../../../../src/components/storage/mongodb/product/model/index";

import fixturesFactory from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( callback: any ) => {

  ProductMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      logger.debug( "Prep Error: " + JSON.stringify( err ) );
      return callback( null );
    }

    ProductMongooseModel.insertMany( fixturesFactory(), ( err: any, savedDocuments: ProductModel[] ) => {

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
