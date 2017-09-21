/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../data-model";
import * as root from "../../interfaces";
import * as session from "../../components/session/interfaces";
import * as moders from "../../components/helpers/moders/interfaces";
import * as response from "../../components/response/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Helpers implements interfaces.Instance {

  /*****************************************************************/

  private readonly apps: root.AppName[] = [ "core", "call263", "grocRound", "powertel", "routers" ];
  private readonly views: root.View[] = [ "passpoint", "about" ]; // appended to in constructor;
  private readonly coreViews: root.CoreView[] = [ "core-developer", "core-admin", "core-consumer" ];
  private readonly call263Views: root.Call263View[] = [ "call263-developer", "call263-admin", "call263-consumer" ];
  private readonly grocRoundViews: root.GrocRoundView[] = [ "grocRound-developer", "grocRound-admin", "grocRound-consumer" ];
  private readonly powertelViews: root.PowertelView[] = [ "powertel-developer", "powertel-admin" ];
  private readonly routersViews: root.RoutersView[] = [ "routers-developer", "routers-admin" ];

  /*****************************************************************/

  constructor(
    private readonly checkThrow: moders.CheckThrow,
    private readonly signedIn: session.SignedIn,
    private readonly getUserFromSession: session.GetCurrentUser,
    private readonly sendResponse: response.Send
  ) {

    this.coreViews.forEach(( view ) => {
      this.views.push( view );
    } );
    this.call263Views.forEach(( view ) => {
      this.views.push( view );
    } );
    this.grocRoundViews.forEach(( view ) => {
      this.views.push( view );
    } );
    this.powertelViews.forEach(( view ) => {
      this.views.push( view );
    } );
    this.routersViews.forEach(( view ) => {
      this.views.push( view );
    } );

  }

  /*****************************************************************/

  readonly validateAppContext = ( appContext: string ): boolean => {

    if ( !appContext ) {
      return false;
    }
    let matches = this.views.filter(( view ) => {
      return ( view == appContext );
    } );
    return ( matches.length ) ? true : false;

  }

  /*****************************************************************/

  readonly getAuthCheck = ( accessLevel: dataModel.core.user.AccessLevel, appContext?: root.View, innerContext?: string ): express.RequestHandler => {

    let classContext = this;

    return function ( req: express.Request, res: express.Response, next: express.NextFunction ) {

      if ( !classContext.signedIn( req ) ) {
        return signInFirst();
      }

      return classContext.getUserFromSession( req )
        .then(( currentUser: dataModel.core.user.Super ) => {

          if ( currentUser.accessLevel == accessLevel ) {
            res.locals.currentUser = currentUser;
            return next();
          } else {
            return signInFirst();
          }

        } );

      function signInFirst () {
        let pairs: string[] = [];
        if ( appContext ) {
          pairs.push( "appContext=" + appContext );
        }
        if ( innerContext ) {
          pairs.push( "nextInnerContext=" + innerContext );
        }
        if ( pairs.length ) {
          return res.redirect( "/passpoint?" + pairs.join( "&" ) );
        } else {
          return res.redirect( "/passpoint" );
        }
      }

    }

  }

  /*****************************************************************/

}

/******************************************************************************/
