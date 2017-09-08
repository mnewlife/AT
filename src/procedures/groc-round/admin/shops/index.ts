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

class Shops implements admin.Shops {

  constructor(
    private readonly events: admin.shops.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getShops: storage.grocRound.shop.Get,
    private readonly getShopById: storage.grocRound.shop.GetById,
    private readonly addNewShop: storage.grocRound.shop.Add,
    private readonly updateShopById: storage.grocRound.shop.UpdateById,
    private readonly removeShopById: storage.grocRound.shop.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.grocRound.shop.FiltrationCriteria, sortCriteria: storage.grocRound.shop.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super[]> => { }

  getOne = ( shopId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super> => { };

  add = ( shop: storage.grocRound.shop.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super> => { }

  update = ( shopId: string, updates: storage.grocRound.shop.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super[]> => { }

  remove = ( shopId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getShops: storage.grocRound.shop.Get,
  getShopById: storage.grocRound.shop.GetById,
  addNewShop: storage.grocRound.shop.Add,
  updateShopById: storage.grocRound.shop.UpdateById,
  removeShopById: storage.grocRound.shop.RemoveById
} ): admin.Shops => {
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