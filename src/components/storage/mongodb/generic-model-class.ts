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

export default class ModelController<
  FC extends any, SC extends interfaces.BaseSortCriteria,
  AD extends any, UD extends any,
  QC extends any, Document extends mongoose.Document,
  DM extends dataModel.ModelRange, DMA extends dataModel.ModelArrayRange,
  E extends events.BaseMethods>
  extends MongoController<FC, SC, AD, UD, QC, Document, DM, DMA, E> implements interfaces.StorageController {

  /*****************************************************************/

  constructor(
    protected readonly events: E,
    protected readonly Model: mongoose.Model<mongoose.Document>,
    protected readonly mapDetails: dataStructures.MapDetails,
    protected readonly checkThrow: moders.CheckThrow,
    protected readonly makeConditions: internalMethods.MakeConditions<FC, QC>,
    protected readonly makeSortCriteria: internalMethods.MakeSortCriteria<SC>,
    protected readonly convertAddDetails: internalMethods.ConvertAddDetails<AD>,
    protected readonly generateUpdateDetails: internalMethods.GenerateUpdateDetails<UD>,
    protected readonly convertToAbstract: internalMethods.ConvertToAbstract<DMA>
  ) {

    super(
      events, Model, mapDetails, checkThrow,
      makeConditions, makeSortCriteria,
      convertAddDetails, generateUpdateDetails, convertToAbstract
    )

  }

  /*****************************************************************/

}

/******************************************************************************/
