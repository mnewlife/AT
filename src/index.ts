/******************************************************************************/

import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as helmet from "helmet";
import * as favicon from "serve-favicon";
import * as compression from "compression";
import * as bodyParser from "body-parser";

import environment from "./environment";
import eventListener from "./event-listener";
import components from "./components";
import procedures from "./procedures";
import routes from "./routes";

import * as dataModel from "./data-model";

/******************************************************************************/

let app = express();
const server = http.createServer( app );

/******************************************************************************/

let components: src.Components = componentsFactory;
let procedures: src.Procedures = proceduresFactory( components );

config.registerReferences( procedures, procedures, server );

/******************************************************************************/

app.set( "trust proxy", 1 );

app.set( "views", "./public" );
app.set( "view engine", "pug" );
app.locals.basedir = __dirname + "/public";

/*************************************************/

let mware: src.components.sharedLogic.AppMiddleware = {

  helmet: [ helmet() ],
  favicon: [ favicon( path.join( __dirname, "/public/favicon.ico" ) ) ],
  compression: [ compression() ],
  express_static: [ express.static( __dirname + "/public" ) ],
  bodyParser_urlEncoded: [ bodyParser.urlencoded( { extended: false } ) ],
  bodyParser_json: [ bodyParser.json() ]

};

for ( let utility in components ) {
  if ( components.hasOwnProperty( utility ) ) {
    components.sharedLogic.middleware.retrieveMwareLists( mware, utility, components[ utility ] );
  }
}

for ( var component in procedures ) {
  if ( procedures.hasOwnProperty( component ) ) {
    components.sharedLogic.middleware.retrieveMwareLists( mware, component, procedures[ component ] );
  }
}

/*************************************************/

var mware_order: string[] = [
  "helmet",
  "favicon",
  "compression",
  "express_static",
  "bodyParser_urlEncoded",
  "bodyParser_json",
  "session",
  "authentication"
];

mware_order.forEach( function ( subject ) {
  if ( mware[ subject ] && mware[ subject ].length ) {
    mware[ subject ].forEach( function ( middleware ) {
      app.use( [ middleware ] );
    } );
  }
} );

/******************************************************************************/

routes( config, app );

/******************************************************************************/

app.use( function ( err: any, req: express.Request, res: express.Response, next: express.NextFunction ) {
  if ( res.headersSent ) {
    return next( err );
  }
  var message = ( err.stack ) ? err.stack : err;
  if ( message ) {
    console.log( "Last Error Handler: " + message );
  } else {
    console.log( "Last Error Handler: Couldn't retrieve error info" );
  }
  res.status( 500 ).json( {
    success: false,
    message: "Something went wrong. Please try again."
  } );
} );

/*******************************************************************************/

server.listen( process.env.PORT || 1111, function () {
  var port = server.address().port;
  console.log( config.environment.applicationName + " now running on port : " + port );
} );

/*******************************************************************************/
