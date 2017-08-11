/******************************************************************************/

import * as core from "./core";
import * as grocRound from "./groc-round";
import * as call263 from "./call-263";
import * as routers from "./routers";
import * as powertel from "./powertel";

import * as moders from "./moders";
import * as mware from "./mware";
import * as numbers from "./numbers";

/******************************************************************************/

export { core, grocRound, call263, routers, powertel };
export { moders, mware, numbers };

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

export interface Moders {
  checkThrow: moders.CheckThrow;
}

export interface Mware {
  retrieveMwareLists: mware.RetrieveMwareLists;
}

export interface Numbers {
  generateRandomNumber: numbers.GenerateRandomNumber;
}

/******************************************************************************/
