/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/shared-logic/numbers/index";

/******************************************************************************/

export interface Emitter {
  generateRandomNumberFailed: ( params: events.GenerateRandomNumberFailedData ) => events.GenerateRandomNumberFailed;
}

export interface GenerateRandomNumber {
  ( min: number, max: number, forceThrow?: boolean ): Promise<number>;
};

/******************************************************************************/
