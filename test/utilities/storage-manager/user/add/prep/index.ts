/******************************************************************************/

import * as Promise from "bluebird";
import * as interfaces from "../../../../../../src/interfaces";
import { UserMongooseModel } from "../../../../../../src/components/storage/mongodb/user/model";

/******************************************************************************/

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done: any ) => {

  UserMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
