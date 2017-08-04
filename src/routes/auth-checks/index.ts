/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces";

import core from "./core";
import call263 from "./call-263";
import grocRound from "./groc-round";

/******************************************************************************/

export default {
  core: core,
  call263: call263,
  grocRound: grocRound
}

/******************************************************************************/

  /*
    core, call263, grocRound
    developer, admin, consumer
  */

  /*

  developer
    login ( authorized, not authorized )
    addAdmin/signUp ( added by 'root' or via rootCode )
    addAdmin ( added by developer )

  admin
    login ( authorized, not authorized )

  consumer
    core - login -> proceed to core
    app - login ( flagged for app )
      [
        if authorized -> check if signed up for app
          if signedUp -> proceed to app
          if not -> go through user init
      ]

    core - signUp -> proceed to core
    app - signUp -> proceed to app

  */