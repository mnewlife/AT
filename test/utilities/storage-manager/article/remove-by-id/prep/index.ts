/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../../src/interfaces/index";

import { ArticleModel , ArticleMongooseModel } from "../../../../../../src/utilities/storage-manager/mongodb/article/model/index";

import fixturesFactory from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( callback : any ) => {

  ArticleMongooseModel.remove( {} , ( err ) => {

    if ( err ) {
logger.debug( "Prep Error: " + JSON.stringify( err ) );
return callback( null );
    }

    ArticleMongooseModel.insertMany( fixturesFactory() , ( err : any , savedDocuments : ArticleModel[] ) => {

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
