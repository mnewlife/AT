/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "Numbers";

/******************************************************************************/

export interface GenerateRandomNumberFailedData {
  min: number,
  max: number,
  reason: any;
};
export interface GenerateRandomNumberFailed extends Happening {
  context: context;
  identifier: "GenerateRandomNumberFailed";
  data: GenerateRandomNumberFailedData;
}

/******************************************************************************/
