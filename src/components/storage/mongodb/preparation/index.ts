/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

/******************************************************************************/

export let ignoreEmpty = ( value: any ): any => {
  return ( value == null ) ? undefined : value;
}

/******************************************************************************/

