/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as sharedLogicInterfaces from "../../../interfaces/utilities/shared-logic";
import dataStructuresFactory from "./data-structures";
import modersFactory from "./moders";
import numbersFactory from "./numbers";
import middlewareFactory from "./middleware";

/******************************************************************************/

class BasicSharedLogic implements interfaces.utilities.SharedLogic {

  readonly dataStructures: sharedLogicInterfaces.DataStructures;
  readonly moders: sharedLogicInterfaces.Moders;
  readonly numbers: sharedLogicInterfaces.Numbers;
  readonly middleware: sharedLogicInterfaces.Middleware;

  constructor( params: sharedLogicInterfaces.Params ) {
    this.dataStructures = params.dataStructures;
    this.moders = params.moders;
    this.numbers = params.numbers;
    this.middleware = params.middleware;
  }

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit ): interfaces.utilities.SharedLogic => {

  return new BasicSharedLogic( {
    dataStructures: dataStructuresFactory( emitEvent ),
    moders: modersFactory(),
    numbers: numbersFactory( emitEvent ),
    middleware: middlewareFactory()
  } );

}
/******************************************************************************/
