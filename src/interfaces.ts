/******************************************************************************/

import * as express from "express";

/******************************************************************************/

export type AppName = "core" | "call263" | "grocRound" | "powertel" | "routers";

export type View = "passpoint" | "about"
  | CoreView | Call263View | GrocRoundView | PowertelView | RoutersView;

export type CoreView = "core-developer" | "core-admin" | "core-consumer";
export type Call263View = "call263-developer" | "call263-admin" | "call263-consumer";
export type GrocRoundView = "grocRound-developer" | "grocRound-admin" | "grocRound-consumer";
export type PowertelView = "powertel-developer" | "powertel-admin";
export type RoutersView = "routers-developer" | "routers-admin";

/******************************************************************************/

export interface AppMiddleware {
  [ index: string ]: express.RequestHandler[];
}

/******************************************************************************/