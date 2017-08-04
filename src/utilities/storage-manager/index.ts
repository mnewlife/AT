/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import mongodbStorageFactory from "./mongodb/index";

/******************************************************************************/

export default ( config : interfaces.Config ) : interfaces.utilities.StorageManager => {

  return mongodbStorageFactory( config );

}

/******************************************************************************/
