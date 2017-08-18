/******************************************************************************/

import * as Promise from "bluebird";

/******************************************************************************/

export interface Constructor {
  new(): ClassInstance;
}

export interface ClassInstance {
  readonly checkThrow: CheckThrow;
}

export interface CheckThrow {
  ( forceThrow: boolean ): Promise<any>;
}

/******************************************************************************/