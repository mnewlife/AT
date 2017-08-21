/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as dataModel from "../../../data-model";
import * as moders from "../../helpers/moders/interfaces";
import * as dataStructures from "../../helpers/data-structures/interfaces";

import * as interfaces from "../interfaces";
import * as internalMethods from "../interfaces/internal-methods";
import * as events from "../interfaces/events/generator";

import MongoController from "./mongo-controller";

/******************************************************************************/

export default class ModelController<FiltrationCriteria extends any, SortCriteria extends interfaces.BaseSortCriteria,
  AddDetails extends any, UpdateDetails extends any,
  QueryConditions extends any, Document extends mongoose.Document,
  DataModel extends dataModel.DataModel, E extends events.BaseMethods>
  extends MongoController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, QueryConditions, Document, DataModel, E>
  implements interfaces.StorageController {

  /*****************************************************************/

  constructor(
    protected readonly events: E,
    protected readonly Model: mongoose.Model<mongoose.Document>,
    protected readonly mapDetails: dataStructures.MapDetails,
    protected readonly checkThrow: moders.CheckThrow,
    protected readonly makeConditions: internalMethods.MakeConditions<FiltrationCriteria, QueryConditions>,
    protected readonly makeSortCriteria: internalMethods.MakeSortCriteria<SortCriteria>,
    protected readonly generateAddDetails: internalMethods.GenerateAddDetails<AddDetails>,
    protected readonly generateUpdateDetails: internalMethods.GenerateUpdateDetails<UpdateDetails, Document>,
    protected readonly convertToAbstract: internalMethods.ConvertToAbstract<Document, DataModel>
  ) {

    super(
      events, Model, mapDetails, checkThrow,
      makeConditions, makeSortCriteria,
      generateAddDetails, generateUpdateDetails, convertToAbstract
    )

  }

  /*****************************************************************/

}

/******************************************************************************/
