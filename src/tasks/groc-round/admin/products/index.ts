/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/tasks/groc-round/admin";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Products implements adminInterfaces.Products {

  constructor(
    private readonly emitter: adminInterfaces.products.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getProducts: storageInterfaces.grocRound.product.Get,
    private readonly getProductById: storageInterfaces.grocRound.product.GetById,
    private readonly addNewProduct: storageInterfaces.grocRound.product.Add,
    private readonly updateProductById: storageInterfaces.grocRound.product.UpdateById,
    private readonly removeProductById: storageInterfaces.grocRound.product.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.grocRound.product.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.product.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super[]> => { }

  getOne = ( productId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super> => { };

  add = ( product: storageInterfaces.grocRound.product.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super> => { }

  update = ( productId: string, updates: storageInterfaces.grocRound.product.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super[]> => { }

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
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getProducts,
    params.getProductById,
    params.addNewProduct,
    params.updateProductById,
    params.removeProductById
  );
}

/******************************************************************************/