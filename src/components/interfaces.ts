/******************************************************************************/

import * as express from "express";

import * as authentication from "./authentication/interfaces";
import * as communication from "./communication/interfaces";
import * as storage from "./storage/interfaces";
import * as session from "./session/interfaces";
import * as response from "./response/interfaces";
import * as helpers from "./helpers/interfaces";

/******************************************************************************/

export { authentication, communication, storage, session, response, helpers };

/******************************************************************************/

export interface MiddlewareBorn {
  middleware: express.RequestHandler[];
}

export interface Instance {
  authentication: authentication.ClassInstance;
  communication: communication.Instance;
  storage: storage.ClassInstance;
  session: session.ClassInstance;
  response: response.ClassInstance;
  helpers: helpers.Instance;
}

/******************************************************************************/