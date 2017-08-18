/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { ChannelMongooseModel } from "../../../../../../src/components/storage/mongodb/channel/model/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

 export default ( done: any ) => {

  ChannelMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
