/******************************************************************************/

import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as helmet from "helmet";
import * as favicon from "serve-favicon";
import * as compression from "compression";
import * as bodyParser from "body-parser";

import * as Environment from "./environment/interfaces";
import * as EventListener from "./event-listener/interfaces";
import * as Components from "./components/interfaces";
import * as Procedures from "./procedures/interfaces";

import environment from "./environment";
import eventListener from "./event-listener";
import components from "./components";
import procedures from "./procedures";
import routes from "./routes";

import * as dataModel from "./data-model";
import * as interfaces from "./interfaces";

/******************************************************************************/

let app = express();
const server: http.Server = http.createServer( app );

/******************************************************************************/

// emitEvent: eventListener.Emit, production: boolean, httpServer: http.Server

let eventListenerInstance: EventListener.Instance = eventListener();

let componentsInstance: Components.Instance = components(
  eventListenerInstance.emit,
  environment.production,
  server
);

let proceduresInstance: Procedures.Instance = procedures(
  eventListenerInstance.emit,
  componentsInstance
);

eventListenerInstance.updateReferences( componentsInstance, proceduresInstance );

/******************************************************************************/

app.set( "trust proxy", 1 );

//app.set( "views", "./views" );
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "pug" );
app.locals.basedir = __dirname + "/public";

/*************************************************/

let mware: interfaces.AppMiddleware = {
  helmet: [ helmet() ],
  favicon: [ favicon( path.join( __dirname, "/public/favicon.ico" ) ) ],
  compression: [ compression() ],
  express_static: [ express.static( __dirname + "/public" ) ],
  bodyParser_urlEncoded: [ bodyParser.urlencoded( { extended: false } ) ],
  bodyParser_json: [ bodyParser.json() ]
};

interface IndexableComponents extends Components.Instance {
  [ index: string ]: Components.Instance[ keyof Components.Instance ];
}

let indexableComponents: IndexableComponents = {
  helpers: componentsInstance.helpers,
  storage: componentsInstance.storage,
  session: componentsInstance.session,
  authentication: componentsInstance.authentication,
  communication: componentsInstance.communication,
  response: componentsInstance.response
};

for ( let utility in indexableComponents ) {
  if ( indexableComponents.hasOwnProperty( utility ) ) {
    componentsInstance.helpers.mware.retrieveMwareLists( mware, utility, indexableComponents[ utility ] );
  }
}

/*************************************************/

let mware_order: string[] = [
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

routes( eventListenerInstance, componentsInstance, proceduresInstance, app );

/******************************************************************************/

app.use(( err: any, req: express.Request, res: express.Response, next: express.NextFunction ) => {
  if ( res.headersSent ) {
    return next( err );
  }
  let message = ( err.stack ) ? err.stack : err;
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
  let port = server.address().port;
  console.log( environment.applicationName + " now running on port : " + port );
} );

/*******************************************************************************/
