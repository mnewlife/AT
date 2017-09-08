/******************************************************************************/

import * as dataModel from "../../../../../data-model";
import * as eventListener from "../../../../../event-listener/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Events implements interfaces.Instance {

  /*****************************************************************/

  constructor( private readonly emitevent: eventListener.Emit ) { }

  /*****************************************************************/

}

/******************************************************************************/