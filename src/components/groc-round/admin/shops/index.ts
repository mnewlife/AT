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

class Shops implements adminInterfaces.Shops {

  constructor(
    private readonly emitter: adminInterfaces.shops.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getShops: storageManagerInterfaces.grocRound.shop.Get,
    private readonly getShopById: storageManagerInterfaces.grocRound.shop.GetById,
    private readonly addNewShop: storageManagerInterfaces.grocRound.shop.Add,
    private readonly updateShopById: storageManagerInterfaces.grocRound.shop.UpdateById,
    private readonly removeShopById: storageManagerInterfaces.grocRound.shop.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.grocRound.shop.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.shop.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super[]> => { }

  getOne = ( shopId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super> => { };

  add = ( shop: storageManagerInterfaces.grocRound.shop.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super> => { }

  update = ( shopId: string, updates: storageManagerInterfaces.grocRound.shop.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super[]> => { }

  remove = ( shopId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getShops: storageManagerInterfaces.grocRound.shop.Get,
  getShopById: storageManagerInterfaces.grocRound.shop.GetById,
  addNewShop: storageManagerInterfaces.grocRound.shop.Add,
  updateShopById: storageManagerInterfaces.grocRound.shop.UpdateById,
  removeShopById: storageManagerInterfaces.grocRound.shop.RemoveById
} ): adminInterfaces.Shops => {
  return new Shops(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getShops,
    params.getShopById,
    params.addNewShop,
    params.updateShopById,
    params.removeShopById
  );
}

/******************************************************************************/