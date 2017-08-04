/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../src/interfaces/index";

import { AirtimeTransferModel, AirtimeTransferMongooseModel } from "../../../../../../src/utilities/storage-manager/mongodb/airtime-transfer/model/index";

/******************************************************************************/

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( done: any ) => {

  AirtimeTransferMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
