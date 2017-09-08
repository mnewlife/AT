/******************************************************************************/

import * as eventListener from "../../event-listener/interfaces";

import * as interfaces from "./interfaces";

import * as DataStructures from "./data-structures/interfaces";
import * as Moders from "./moders/interfaces";
import * as Mware from "./mware/interfaces";
import * as Numbers from "./numbers/interfaces";

import dataStructures from "./data-structures";
import moders from "./moders";
import mware from "./mware";
import numbers from "./numbers";

/******************************************************************************/

class Helpers implements interfaces.Instance {

  constructor(
    readonly dataStructures: DataStructures.Instance,
    readonly moders: Moders.Instance,
    readonly mware: Mware.Instance,
    readonly numbers: Numbers.Instance
  ) { }

}

/******************************************************************************/

export default ( emitEvent: eventListener.Emit ): interfaces.Instance => {

  let modersInstance = moders();

  return new Helpers(
    dataStructures( emitEvent, modersInstance.checkThrow ),
    modersInstance,
    mware(),
    numbers( emitEvent, modersInstance.checkThrow )
  );
  
}

/******************************************************************************/
