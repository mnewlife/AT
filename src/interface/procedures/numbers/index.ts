/******************************************************************************/

import * as Promise from "bluebird";

import * as events from "./events";

/******************************************************************************/

export interface Events {
  generateRandomNumberFailed: ( params: events.GenerateRandomNumberFailedData ) => events.GenerateRandomNumberFailed;
}

export interface GenerateRandomNumber {
  ( min: number, max: number, forceThrow?: boolean ): Promise<number>;
};

/******************************************************************************/
