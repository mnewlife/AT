/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as dataStructures from "./data-structures/index";
import * as middleware from "./middleware/index";
import * as moders from "./moders/index";
import * as numbers from "./numbers/index";

/******************************************************************************/

export { dataStructures, middleware, moders, numbers };

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
  middleware: Middleware;
  numbers: Numbers;
  moders: Moders;
};

export interface Moders {
  readonly checkThrow: moders.CheckThrow;
}

export interface Numbers {
  readonly generateRandomNumber: numbers.GenerateRandomNumber;
};

export interface Middleware {
  readonly retrieveMwareLists: middleware.RetrieveMwareLists;
};

export interface AppMiddleware {
  [ index: string ]: express.RequestHandler[];
}

/******************************************************************************/

