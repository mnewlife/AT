/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "Call263|Admin|Payments";

/******************************************************************************/

export interface ExampleData {
  user: interfaces.dataModel.User;
}
export interface Example extends Happening {
  context: context;
  identifier: "Example";
  data: ExampleData;
}

/******************************************************************************/