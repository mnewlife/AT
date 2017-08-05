/******************************************************************************/

import * as core from "./core";
import * as grocRound from "./groc-round";
import * as call263 from "./call-263";
import * as routers from "./routers";
import * as powertel from "./powertel";

/******************************************************************************/

export { core, grocRound, call263, routers, powertel };

/******************************************************************************/

//

/******************************************************************************/

export interface DataModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/******************************************************************************/

export interface Happening {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}

/******************************************************************************/
