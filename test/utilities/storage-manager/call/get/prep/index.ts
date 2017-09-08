/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { CallModel, CallMongooseModel } from "../../../../../../src/components/storage/mongodb/call/model/index";

import fixtures from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( callback: any ) => {

  CallMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      logger.debug( "Prep Error: " + JSON.stringify( err ) );
      return callback( null );
    }

    CallMongooseModel.insertMany( fixturesFactory(), ( err: any, savedDocuments: CallModel[] ) => {

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
