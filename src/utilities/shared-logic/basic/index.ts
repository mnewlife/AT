/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../interfaces";
import * as sharedLogicInterfaces from "../../../interfaces/utilities/shared-logic";
import dataStructuresFactory from "./data-structures";
import modersFactory from "./moders";
import numbersFactory from "./numbers";
import mwareFactory from "./mware";

/******************************************************************************/

class BasicSharedLogic implements interfaces.utilities.SharedLogic {

  middleware: express.RequestHandler[] = [];
  
  readonly dataStructures: sharedLogicInterfaces.DataStructures;
  readonly moders: sharedLogicInterfaces.Moders;
  readonly numbers: sharedLogicInterfaces.Numbers;
  readonly mware: sharedLogicInterfaces.Mware;

  constructor( params: sharedLogicInterfaces.Params ) {
    this.dataStructures = params.dataStructures;
    this.moders = params.moders;
    this.numbers = params.numbers;
    this.mware = params.mware;
  }

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit ): interfaces.utilities.SharedLogic => {

  return new BasicSharedLogic( {
    dataStructures: dataStructuresFactory( emitEvent ),
    moders: modersFactory(),
    numbers: numbersFactory( emitEvent ),
    mware: mwareFactory()
  } );

}
/******************************************************************************/
