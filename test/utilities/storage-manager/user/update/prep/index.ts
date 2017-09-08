/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { UserModel, UserMongooseModel } from "../../../../../../src/components/storage/mongodb/user/model/index";

import fixtures from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( callback: any ) => {

  UserMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      logger.debug( "Prep Error: " + JSON.stringify( err ) );
      return callback( null );
    }

    UserMongooseModel.insertMany( fixturesFactory(), ( err: any, savedDocuments: UserModel[] ) => {

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
