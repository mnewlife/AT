/******************************************************************************/

import * as express from "express";

import authentication from "./authentication";
import communication from "./communication";
import storage from "./storage";
import session from "./session";
import response from "./response";
import helpers from "./helpers";

/******************************************************************************/

export interface MiddlewareBorn {
  middleware: express.RequestHandler[];
}

export interface Components {
  authentication: authentication.Authentication;
  communication: communication.Communication;
  storage: storage.Storage;
  session: session.Session;
  response: response.Response;
  helpers: helpers.Helpers;
  [ index: string ]: Components[ typeof Components ];
}

/******************************************************************************/