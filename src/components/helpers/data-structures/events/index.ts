/******************************************************************************/

import * as eventListener from "../../../../event-listener/interfaces";
import * as components from "../../../../components/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.ClassInstance {

  /*****************************************************************/

  constructor( private readonly emitEvent: eventListener.Emit ) { }

  /*****************************************************************/

  readonly mapDetailsFailed = ( data: interfaces.MapDetailsFailedData ) => {
    let event: interfaces.MapDetailsFailed = {
      context: "DataStructures",
      tags: [],
      identifier: "MapDetailsFailed",
      data: {
        details: data.details,
        destination: data.destination,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

  readonly sortObjectArrayFailed = ( data: interfaces.SortObjectArrayFailedData ) => {
    let event: interfaces.SortObjectArrayFailed = {
      context: "DataStructures",
      tags: [],
      identifier: "SortObjectArrayFailed",
      data: {
        array: data.array,
        criteria: data.criteria,
        order: data.order,
        reason: data.reason
      }
    };
    this.emitEvent( event );
    return event;
  }

  /*****************************************************************/

}

/******************************************************************************/