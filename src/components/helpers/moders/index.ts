/******************************************************************************/

import * as interfaces from "./interfaces";

import factory from "./factory";
import canon from "./canon";

/******************************************************************************/

export default (): interfaces.ClassInstance => {
  return factory( canon );
}

/******************************************************************************/
