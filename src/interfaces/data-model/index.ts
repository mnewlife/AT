/******************************************************************************/

import * as core from "./core";
import * as grocRound from "./groc-round";
import * as call263 from "./call-263";
import * as powertel from "./powertel";
import * as routers from "./routers";

/******************************************************************************/

export { core, grocRound, call263, routers, powertel };

/******************************************************************************/

export type ModelRange = core.ModelRange | grocRound.ModelRange | call263.ModelRange
  | powertel.ModelRange | routers.ModelRange;
export type ModelArrayRange = core.ModelArrayRange | grocRound.ModelArrayRange | call263.ModelArrayRange
  | powertel.ModelArrayRange | routers.ModelArrayRange;

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
