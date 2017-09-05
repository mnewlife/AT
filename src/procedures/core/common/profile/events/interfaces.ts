/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../../../data-model";
import * as eventListener from "../../../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): ClassInstance;
}

export interface ClassInstance {
  readonly signedIn: ( data: SignedInData ) => SignedIn;
  readonly signInFailed: ( data: SignInFailedData ) => SignInFailed;
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "Procedures|Core|Common|Auth";
}

/******************************************************************************/

export interface SignedIn extends BaseEvent {
  identifier: "SignedIn",
  data: SignedInData;
}
export interface SignedInData {
  emailAddress: string;
  req: express.Request;
};

/******************************************************************************/

export interface SignInFailed extends BaseEvent {
  identifier: "SignInFailed";
  data: SignInFailedData;
}
export interface SignInFailedData {
  emailAddress: string;
  req: express.Request;
  reason: any;
};

/******************************************************************************/
