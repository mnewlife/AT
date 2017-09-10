/******************************************************************************/

import * as dataModel from "../data-model";
import * as components from "../components/interfaces";
import * as procedures from "../procedures/interfaces";

import * as hooks from "./hooks";

/******************************************************************************/

export { hooks };

/******************************************************************************/

export interface Instance {
  readonly emit: Emit;
  readonly updateReferences: UpdateReferences;
};

export interface Emit {
  ( happening: dataModel.Happening ): void;
}

export interface UpdateReferences {
  ( components: components.Instance, procedures: procedures.Instance ): void;
}

/******************************************************************************/