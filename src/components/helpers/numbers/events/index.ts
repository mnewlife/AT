/******************************************************************************/

import * as eventListener from "../../../../event-listener/interfaces";
import * as components from "../../../../components/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.Instance {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventListener.Emit ) { }

  /*****************************************************************/

  readonly generateRandomNumberFailed = ( data: interfaces.GenerateRandomNumberFailedData ) => {
    let event: interfaces.GenerateRandomNumberFailed = {
      context: "Numbers",
      tags: [],
      identifier: "GenerateRandomNumberFailed",
      data: {
        min: data.min,
        max: data.max,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

}

/******************************************************************************/