/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces";
import * as dataStructures from "./data-structures";
import * as mware from "./mware";
import * as moders from "./moders";
import * as numbers from "./numbers";

/******************************************************************************/

export { dataStructures, mware, moders, numbers };

/******************************************************************************/

export interface DataStructures {
  readonly findInArray: dataStructures.FindInArray;
  readonly removeFromArray: dataStructures.RemoveFromArray;
  readonly pushToArray: dataStructures.PushToArray;
  readonly mapDetails: dataStructures.MapDetails;
  readonly sortObjectArray: dataStructures.SortObjectArray;
};

export interface Params {
  dataStructures: DataStructures;
  mware: Mware;
  numbers: Numbers;
  moders: Moders;
};

/******************************************************************************/

export interface Moders {
  readonly checkThrow: moders.CheckThrow;
}

export interface Numbers {
  readonly generateRandomNumber: numbers.GenerateRandomNumber;
};

export interface Mware {
  readonly retrieveMwareLists: mware.RetrieveMwareLists;
};

/******************************************************************************/

export interface AppMiddleware {
  [ index: string ]: express.RequestHandler[];
}

/******************************************************************************/

