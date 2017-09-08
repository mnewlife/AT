/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/groc-round/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class Products implements admin.Products {

  constructor(
    private readonly events: admin.products.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getProducts: storage.grocRound.product.Get,
    private readonly getProductById: storage.grocRound.product.GetById,
    private readonly addNewProduct: storage.grocRound.product.Add,
    private readonly updateProductById: storage.grocRound.product.UpdateById,
    private readonly removeProductById: storage.grocRound.product.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.grocRound.product.FiltrationCriteria, sortCriteria: storage.grocRound.product.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super[]> => { }

  getOne = ( productId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super> => { };

  add = ( product: storage.grocRound.product.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super> => { }

  update = ( productId: string, updates: storage.grocRound.product.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super[]> => { }

  remove = ( productId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getProducts: storage.grocRound.product.Get,
  getProductById: storage.grocRound.product.GetById,
  addNewProduct: storage.grocRound.product.Add,
  updateProductById: storage.grocRound.product.UpdateById,
  removeProductById: storage.grocRound.product.RemoveById
} ): admin.Products => {
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