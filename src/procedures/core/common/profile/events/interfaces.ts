/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../../../data-model";
import * as eventListener from "../../../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): Instance;
}

export interface Instance {
  
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "Procedures|Core|Common|Profile";
}

/******************************************************************************/
