/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/groc-round/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Products implements adminInterfaces.Products {

  constructor(
    private readonly emitter: adminInterfaces.products.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getProducts: storageManagerInterfaces.grocRound.product.Get,
    private readonly getProductById: storageManagerInterfaces.grocRound.product.GetById,
    private readonly addNewProduct: storageManagerInterfaces.grocRound.product.Add,
    private readonly updateProductById: storageManagerInterfaces.grocRound.product.UpdateById,
    private readonly removeProductById: storageManagerInterfaces.grocRound.product.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.grocRound.product.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.product.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super[]> => { }

  getOne = ( productId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super> => { };

  add = ( product: storageManagerInterfaces.grocRound.product.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super> => { }

  update = ( productId: string, updates: storageManagerInterfaces.grocRound.product.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super[]> => { }

  remove = ( productId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getProducts: storageManagerInterfaces.grocRound.product.Get,
  getProductById: storageManagerInterfaces.grocRound.product.GetById,
  addNewProduct: storageManagerInterfaces.grocRound.product.Add,
  updateProductById: storageManagerInterfaces.grocRound.product.UpdateById,
  removeProductById: storageManagerInterfaces.grocRound.product.RemoveById
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