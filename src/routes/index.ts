/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../data-model";
import * as EventListener from "../event-listener/interfaces";
import * as Components from "../components/interfaces";
import * as Procedures from "../procedures/interfaces";

import * as helpers from "./helpers/interfaces";

import Helpers from "./helpers";
import passpoint from "./passpoint";
//import call263 from "./call-263";
import core from "./core";
import grocRound from "./groc-round";
//import powertel from "./powertel";
//import routers from "./routers";

/******************************************************************************/

export default (
  eventListener: EventListener.Instance,
  components: Components.Instance,
  procedures: Procedures.Instance,
  app: express.Application
): void => {

  /**********************************************************/

  let helpers = new Helpers(
    components.helpers.moders.checkThrow,
    components.session.signedIn,
    components.session.getCurrentUser,
    components.response.send
  );

  app.use( "/passpoint", passpoint( components.response.send, helpers.validateAppContext ) );

  //app.use( "/call263", call263() );

  app.use( "/core", core(
    components,
    procedures,
    helpers
  ) );

  app.use( "/grocRound", grocRound( components, procedures, helpers ) );

  //app.use( "/powertel", powertel() );

  //app.use( "/routers", routers() );

  /**********************************************************/

  app.get( "/", function ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( components.session.signedIn( req ) ) {

      return components.authentication.getCurrentUser( req )
        .then(( currentUser: dataModel.core.user.Super ) => {

          return components.response.send( res, "about", true, null, { currentUser: currentUser } );

        } );

    }

    return components.response.send( res, "about", true, null, null );

  } );

  /**********************************************************/

}

/******************************************************************************/
