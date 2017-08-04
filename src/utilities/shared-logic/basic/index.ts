/******************************************************************************/

import * as interfaces from "../../../interfaces/index";

import dataStructuresFactory from "./data-structures/index";
import * as sharedLogicInterfaces from "../../../interfaces/utilities/shared-logic/index";
import modersFactory from "./moders/index";
import numbersFactory from "./numbers/index";
import middlewareFactory from "./middleware/index";

/******************************************************************************/

class BasicSharedLogic implements interfaces.utilities.SharedLogic {

  readonly dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  readonly moders: interfaces.utilities.sharedLogic.Moders;
  readonly numbers: interfaces.utilities.sharedLogic.Numbers;
  readonly middleware: interfaces.utilities.sharedLogic.Middleware;

  constructor( params : sharedLogicInterfaces.Params ) {

    this.dataStructures = params.dataStructures;
    this.moders = params.moders;
    this.numbers = params.numbers;
    this.middleware = params.middleware;

  }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.utilities.SharedLogic => {

  return new BasicSharedLogic( {
    dataStructures: dataStructuresFactory( config.eventManager.emit ),
    moders: modersFactory(),
    numbers: numbersFactory( config.eventManager.emit ),
    middleware: middlewareFactory()
  } );

}
/******************************************************************************/
