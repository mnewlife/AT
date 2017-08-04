/******************************************************************************/

import * as core from "./core";
import * as grocRound from "./groc-round";
import * as call263 from "./call-263";
import * as routers from "./routers";
import * as powertel from "./powertel";

/******************************************************************************/

export { core, grocRound, call263, routers, powertel };

/******************************************************************************/

export interface Core {
  developer: core.Developer;
  admin: core.Admin;
  consumer: core.Consumer;
}

export interface GrocRound {
  developer: grocRound.Developer;
  admin: grocRound.Admin;
  consumer: grocRound.Consumer;
}

export interface Call263 {
  developer: call263.Developer;
  admin: call263.Admin;
  consumer: call263.Consumer;
}

export interface Routers {
  developer: routers.Developer;
  admin: routers.Admin;
  consumer: routers.Consumer;
}

export interface Powertel {
  developer: powertel.Developer;
  admin: powertel.Admin;
  consumer: powertel.Consumer;
}

/******************************************************************************/
