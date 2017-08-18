/******************************************************************************/

import * as src from "../../../../../../src";

/******************************************************************************/

export interface BaseEvent extends dataModel.Happening {
  context: "Core|Admin|Admins";
}

/******************************************************************************/

export interface ExampleData {
  
}
export interface Example extends BaseEvent {
  identifier: "Example";
  data: ExampleData;
}

/******************************************************************************/