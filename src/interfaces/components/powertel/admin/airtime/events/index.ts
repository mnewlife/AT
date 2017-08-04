/******************************************************************************/

import * as interfaces from "../../../../../../interfaces";

/******************************************************************************/

interface BaseEvent extends interfaces.dataModel.Happening {
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