/******************************************************************************/

import * as core from "./core/index";
import * as call263 from "./call-263/index";
import * as grocRound from "./groc-round/index";
import * as sharedCode from "./shared-code/index";

/******************************************************************************/

export { core, call263, grocRound, sharedCode };

/******************************************************************************/

export interface Params {
  core: Core;
  call263: Call263;
  GrocRound: GrocRound;
}

export interface Core {
  developer: core.Developer;
  admin: core.Admin;
  consumer: core.Consumer;
}

export interface Call263 {
  developer: call263.Developer;
  admin: call263.Admin;
  consumer: call263.Consumer;
}

export interface GrocRound {
  developer: grocRound.Developer;
  admin: grocRound.Admin;
  consumer: grocRound.Consumer;
}

export interface SharedCode {
}

/******************************************************************************/
