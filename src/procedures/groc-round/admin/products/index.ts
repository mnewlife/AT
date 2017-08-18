/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/groc-round/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class Products implements adminInterfaces.Products {

  constructor(
    private readonly events: adminInterfaces.products.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getProducts: storageInterfaces.grocRound.product.Get,
    private readonly getProductById: storageInterfaces.grocRound.product.GetById,
    private readonly addNewProduct: storageInterfaces.grocRound.product.Add,
    private readonly updateProductById: storageInterfaces.grocRound.product.UpdateById,
    private readonly removeProductById: storageInterfaces.grocRound.product.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.grocRound.product.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.product.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super[]> => { }

  getOne = ( productId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super> => { };

  add = ( product: storageInterfaces.grocRound.product.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super> => { }

  update = ( productId: string, updates: storageInterfaces.grocRound.product.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super[]> => { }

  remove = ( productId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getProducts: storageInterfaces.grocRound.product.Get,
  getProductById: storageInterfaces.grocRound.product.GetById,
  addNewProduct: storageInterfaces.grocRound.product.Add,
  updateProductById: storageInterfaces.grocRound.product.UpdateById,
  removeProductById: storageInterfaces.grocRound.product.RemoveById
} ): adminInterfaces.Products => {
  return new Products(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getProducts,
    params.getProductById,
    params.addNewProduct,
    params.updateProductById,
    params.removeProductById
  );
}

/******************************************************************************/