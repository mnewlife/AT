/******************************************************************************/

import * as dataStructures from "./data-structures/interfaces";
import * as moders from "./moders/interfaces";
import * as mware from "./mware/interfaces";
import * as numbers from "./numbers/interfaces";

/******************************************************************************/

export interface Instance {
  readonly dataStructures: dataStructures.ClassInstance;
  readonly moders: moders.ClassInstance;
  readonly mware: mware.ClassInstance;
  readonly numbers: numbers.ClassInstance;
}

/******************************************************************************/