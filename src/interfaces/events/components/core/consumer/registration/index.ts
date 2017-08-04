/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "Core|Consumer|Registration";

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