/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/src/index";

import { ContributionModel , ContributionMongooseModel } from "../../../../../../src/components/storage/mongodb/contribution/model/index";

import fixturesFactory from "./data/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

export default ( callback : any ) => {

  ContributionMongooseModel.remove( {} , ( err ) => {

    if ( err ) {
logger.debug( "Prep Error: " + JSON.stringify( err ) );
return callback( null );
    }

    ContributionMongooseModel.insertMany( fixturesFactory() , ( err : any , savedDocuments : ContributionModel[] ) => {

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
