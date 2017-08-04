/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../src/interfaces/index";

import { ArticleMongooseModel } from "../../../../../../src/utilities/storage-manager/mongodb/article/model/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( done : any ) => {

  ArticleMongooseModel.remove( {} , ( err ) => {

    if ( err ) {
      return logger.debug( "Prep Error: " + JSON.stringify( err ) );
    } else {
      return done();
    }

  } );

}



/******************************************************************************/
