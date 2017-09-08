/******************************************************************************/

import * as moders from "../moders/interfaces";

import * as events from "./events/interfaces";

/******************************************************************************/

export interface Constructor {
  new( events: events.Instance, checkThrow: moders.CheckThrow ): Instance;
}

export interface Instance {
  readonly generateRandomNumber: GenerateRandomNumber;
}

export interface GenerateRandomNumber {
  ( min: number, max: number, forceThrow?: boolean ): Promise<number>;
}

/******************************************************************************/