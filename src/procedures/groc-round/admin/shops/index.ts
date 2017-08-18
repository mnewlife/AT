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

class Shops implements adminInterfaces.Shops {

  constructor(
    private readonly events: adminInterfaces.shops.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getShops: storageInterfaces.grocRound.shop.Get,
    private readonly getShopById: storageInterfaces.grocRound.shop.GetById,
    private readonly addNewShop: storageInterfaces.grocRound.shop.Add,
    private readonly updateShopById: storageInterfaces.grocRound.shop.UpdateById,
    private readonly removeShopById: storageInterfaces.grocRound.shop.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.grocRound.shop.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.shop.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super[]> => { }

  getOne = ( shopId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super> => { };

  add = ( shop: storageInterfaces.grocRound.shop.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super> => { }

  update = ( shopId: string, updates: storageInterfaces.grocRound.shop.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super[]> => { }

  remove = ( shopId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getShops: storageInterfaces.grocRound.shop.Get,
  getShopById: storageInterfaces.grocRound.shop.GetById,
  addNewShop: storageInterfaces.grocRound.shop.Add,
  updateShopById: storageInterfaces.grocRound.shop.UpdateById,
  removeShopById: storageInterfaces.grocRound.shop.RemoveById
} ): adminInterfaces.Shops => {
  return new Shops(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getShops,
    params.getShopById,
    params.addNewShop,
    params.updateShopById,
    params.removeShopById
  );
}

/******************************************************************************/