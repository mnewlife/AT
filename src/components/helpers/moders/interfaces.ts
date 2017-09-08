/******************************************************************************/

import * as Promise from "bluebird";

/******************************************************************************/

export interface Constructor {
  new(): Instance;
}

export interface Instance {
  readonly checkThrow: CheckThrow;
}

export interface CheckThrow {
  ( forceThrow: boolean ): Promise<any>;
}

/******************************************************************************/