/******************************************************************************/

import * as dataModel from "../../data-model";

/******************************************************************************/

export interface Instance {
  hooks: any;
}

/******************************************************************************/

export interface Hook {
  afterware: Afterware[];
  readonly [ index: string ]: Afterware[];
}

export interface Afterware {
  ( happening: dataModel.Happening ): void;
}

/******************************************************************************/
