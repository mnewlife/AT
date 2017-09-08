/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { ArticleModel, ArticleMongooseModel } from "../../../../../../src/components/storage/mongodb/article/model/index";

import fixtures from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( callback: any ) => {

  ArticleMongooseModel.remove( {}, ( err ) => {

    if ( err ) {
      logger.debug( "Prep Error: " + JSON.stringify( err ) );
      return callback( null );
    }

    ArticleMongooseModel.insertMany( fixturesFactory(), ( err: any, savedDocuments: ArticleModel[] ) => {

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
