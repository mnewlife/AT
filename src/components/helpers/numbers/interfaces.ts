/******************************************************************************/

import * as moders from "../moders/interfaces";

import * as events from "./events/interfaces";

/******************************************************************************/

export interface Constructor {
  new( events: events.ClassInstance, checkThrow: moders.CheckThrow ): ClassInstance;
}

export interface ClassInstance {
  readonly generateRandomNumber: GenerateRandomNumber;
}

export interface GenerateRandomNumber {
  ( min: number, max: number, forceThrow?: boolean ): Promise<number>;
}

/******************************************************************************/