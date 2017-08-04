/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export let ignoreEmpty = ( value: any ): any => {
  return ( value == null ) ? undefined : value;
}

/******************************************************************************/

