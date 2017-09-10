/******************************************************************************/

import * as components from "../../components/interfaces";
import * as dataStructures from "./data-structures/interfaces";
import * as moders from "./moders/interfaces";
import * as mware from "./mware/interfaces";
import * as numbers from "./numbers/interfaces";

/******************************************************************************/

export interface Instance extends components.MiddlewareBorn {
  readonly dataStructures: dataStructures.Instance;
  readonly moders: moders.Instance;
  readonly mware: mware.Instance;
  readonly numbers: numbers.Instance;
}

/******************************************************************************/