/******************************************************************************/

import * as Promise from "bluebird";
let mongoose = require( "mongoose" );

/******************************************************************************/

let linkToDB : string = "mongodb://127.0.0.1:27017/AllThings263_test";

mongoose.Promise = Promise;

mongoose.connect( linkToDB , ( err : any , res : any ) => {
  if ( err ) {
    throw new Error( "\n" + "Error connecting to database : " + linkToDB + ", Error details : " + err );
  }
} );

/******************************************************************************/
