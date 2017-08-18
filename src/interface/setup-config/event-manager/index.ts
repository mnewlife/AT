/******************************************************************************/

import * as src from "../../../src";
import * as hooks from "./hooks";

/******************************************************************************/

export { hooks };

/******************************************************************************/

export interface Emit {
  ( happening : dataModel.Happening ) : void;
}

export interface UpdateReferences {
  ( components : src.Components , procedures : src.Procedures ) : void
}

/******************************************************************************/

export interface Hooks {
  hookStructure : HookStructure;

  readonly updateReferences : src.setupConfig.eventManager.hooks.UpdateReferences;
}

/******************************************************************************/

export interface HookStructure {
  readonly [ index : string ] : ContextHooks;
}

/*****************************************/

export interface ContextHooks {
  readonly [ index : string ] : Hook;
}

/*****************************************/

export interface Hook {
  tags : string[];
  afterware : Afterware[];

  readonly [ index : string ] : string[] | Afterware[];
}

export interface Afterware {
  ( happening : dataModel.Happening ) : void;
}

/******************************************************************************/
