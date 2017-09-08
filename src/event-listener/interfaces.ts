/******************************************************************************/

import * as dataModel from "../data-model";
import * as hooks from "./hooks";

/******************************************************************************/

export { hooks };

/******************************************************************************/

export interface Instance {
  readonly emit: Emit;
};

export interface Emit {
  ( happening: dataModel.Happening ): void;
}

/******************************************************************************/