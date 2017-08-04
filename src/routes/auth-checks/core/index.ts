/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../interfaces";

/******************************************************************************/

let appContext = "core";

export default {

  developer: ( req: express.Request, res: express.Response, next: express.NextFunction ): any => {

    if ( req.session.currentUser && req.session.currentUser.accessLevel === "developer" ) {
      next();
    } else {

      res.status( 401 );
      
      let extraData: any = {
        appContext: appContext
      };
      let stringifiedData: string = "";
      
      try {
        stringifiedData = JSON.stringify( extraData );
      } catch ( ex ) {
        console.log( "\n" + ">>> JSON STRINGIFY ERROR -> " + ex );
      }

      return res.redirect( "/?extraData=" + stringifiedData );

    }

  },

  admin: ( req: express.Request, res: express.Response, next: express.NextFunction ): any => {

    if ( req.session.currentUser && req.session.currentUser.accessLevel === "admin" ) {
      next();
    } else {

      res.status( 401 );
      
      let extraData: any = {
        appContext: appContext
      };
      let stringifiedData: string = "";
      
      try {
        stringifiedData = JSON.stringify( extraData );
      } catch ( ex ) {
        console.log( "\n" + ">>> JSON STRINGIFY ERROR -> " + ex );
      }

      return res.redirect( "/?extraData=" + stringifiedData );

    }

  },
  
  consumer: ( req: express.Request, res: express.Response, next: express.NextFunction ): any => {

    if ( req.session.currentUser && req.session.currentUser.accessLevel === "consumer" ) {
      next();
    } else {

      res.status( 401 );
      
      let extraData: any = {
        appContext: appContext
      };
      let stringifiedData: string = "";
      
      try {
        stringifiedData = JSON.stringify( extraData );
      } catch ( ex ) {
        console.log( "\n" + ">>> JSON STRINGIFY ERROR -> " + ex );
      }

      return res.redirect( "/?extraData=" + stringifiedData );

    }

  }

}

/******************************************************************************/