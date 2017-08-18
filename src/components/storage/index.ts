/******************************************************************************/

import * as src from "../../src";
import mongodbStorageFactory from "./mongodb";

/******************************************************************************/

export default ( config : src.Config ) : src.components.Storage => {
  return mongodbStorageFactory( config );
}

/******************************************************************************/
