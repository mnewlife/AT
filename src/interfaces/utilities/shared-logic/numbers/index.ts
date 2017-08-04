/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as events from "./events";

/******************************************************************************/

export interface Emitter {
  generateRandomNumberFailed: ( params: events.GenerateRandomNumberFailedData ) => events.GenerateRandomNumberFailed;
}

export interface GenerateRandomNumber {
  ( min: number, max: number, forceThrow?: boolean ): Promise<number>;
};

/******************************************************************************/
