/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";

import * as user from "./user/index";
import * as event from "./event/index";
import * as progression from "./progression/index";
import * as notification from "./notification/index";
import * as invitation from "./invitation/index";
import * as subscription from "./subscription/index";

import * as channel from "./channel/index";
import * as payment from "./payment/index";
import * as airtimeTransfer from "./airtime-transfer/index";
import * as call from "./call/index";

import * as shop from "./shop/index";
import * as product from "./product/index";
import * as price from "./price/index";
import * as round from "./round/index";
import * as roundContributor from "./round-contributor/index";
import * as track from "./track/index";
import * as trackProduct from "./track-product/index";
import * as contribution from "./contribution/index";
import * as deliveryFee from "./delivery-fee/index";
import * as cart from "./cart/index";
import * as cartProduct from "./cart-product/index";
import * as disbursement from "./disbursement/index";
import * as article from "./article/index";

/******************************************************************************/

export { user , event , progression , notification , invitation , subscription };

export { channel , payment , airtimeTransfer , call };

export { shop , product , price , round , roundContributor , track };
export { trackProduct , contribution , deliveryFee , cart , cartProduct };
export { disbursement , article };

/******************************************************************************/

export interface StorageController {}

/******************************************************************************/

export interface StorageUser extends StorageController {
  get : interfaces.utilities.storageManager.user.Get;
  getById : interfaces.utilities.storageManager.user.GetById;

  add : interfaces.utilities.storageManager.user.Add;
  addBatch : interfaces.utilities.storageManager.user.AddBatch;

  update : interfaces.utilities.storageManager.user.Update;
  updateById : interfaces.utilities.storageManager.user.UpdateById;

  remove : interfaces.utilities.storageManager.user.Remove;
  removeById : interfaces.utilities.storageManager.user.RemoveById;
}

export interface StorageProgression extends StorageController {
  get : interfaces.utilities.storageManager.progression.Get;
  getById : interfaces.utilities.storageManager.progression.GetById;

  add : interfaces.utilities.storageManager.progression.Add;
  addBatch : interfaces.utilities.storageManager.progression.AddBatch;

  update : interfaces.utilities.storageManager.progression.Update;
  updateById : interfaces.utilities.storageManager.progression.UpdateById;

  remove : interfaces.utilities.storageManager.progression.Remove;
  removeById : interfaces.utilities.storageManager.progression.RemoveById;
};

export interface StorageEvent extends StorageController {
  get : interfaces.utilities.storageManager.event.Get;
  getById : interfaces.utilities.storageManager.event.GetById;

  add : interfaces.utilities.storageManager.event.Add;
  addBatch : interfaces.utilities.storageManager.event.AddBatch;

  update : interfaces.utilities.storageManager.event.Update;
  updateById : interfaces.utilities.storageManager.event.UpdateById;

  remove : interfaces.utilities.storageManager.event.Remove;
  removeById : interfaces.utilities.storageManager.event.RemoveById;
};

export interface StorageNotification extends StorageController {
  get : interfaces.utilities.storageManager.notification.Get;
  getById : interfaces.utilities.storageManager.notification.GetById;

  add : interfaces.utilities.storageManager.notification.Add;
  addBatch : interfaces.utilities.storageManager.notification.AddBatch;

  update : interfaces.utilities.storageManager.notification.Update;
  updateById : interfaces.utilities.storageManager.notification.UpdateById;

  remove : interfaces.utilities.storageManager.notification.Remove;
  removeById : interfaces.utilities.storageManager.notification.RemoveById;
};

export interface StorageInvitation extends StorageController {
  get : interfaces.utilities.storageManager.invitation.Get;
  getById : interfaces.utilities.storageManager.invitation.GetById;

  add : interfaces.utilities.storageManager.invitation.Add;
  addBatch : interfaces.utilities.storageManager.invitation.AddBatch;

  update : interfaces.utilities.storageManager.invitation.Update;
  updateById : interfaces.utilities.storageManager.invitation.UpdateById;

  remove : interfaces.utilities.storageManager.invitation.Remove;
  removeById : interfaces.utilities.storageManager.invitation.RemoveById;
};

export interface StorageSubscription extends StorageController {
  get : interfaces.utilities.storageManager.subscription.Get;
  getById : interfaces.utilities.storageManager.subscription.GetById;

  add : interfaces.utilities.storageManager.subscription.Add;
  addBatch : interfaces.utilities.storageManager.subscription.AddBatch;

  update : interfaces.utilities.storageManager.subscription.Update;
  updateById : interfaces.utilities.storageManager.subscription.UpdateById;

  remove : interfaces.utilities.storageManager.subscription.Remove;
  removeById : interfaces.utilities.storageManager.subscription.RemoveById;
};

/******************************************************************************/

export interface StorageChannel extends StorageController {
  get : interfaces.utilities.storageManager.channel.Get;
  getById : interfaces.utilities.storageManager.channel.GetById;

  add : interfaces.utilities.storageManager.channel.Add;
  addBatch : interfaces.utilities.storageManager.channel.AddBatch;

  update : interfaces.utilities.storageManager.channel.Update;
  updateById : interfaces.utilities.storageManager.channel.UpdateById;

  remove : interfaces.utilities.storageManager.channel.Remove;
  removeById : interfaces.utilities.storageManager.channel.RemoveById;
};

export interface StoragePayment extends StorageController {
  get : interfaces.utilities.storageManager.payment.Get;
  getById : interfaces.utilities.storageManager.payment.GetById;

  add : interfaces.utilities.storageManager.payment.Add;
  addBatch : interfaces.utilities.storageManager.payment.AddBatch;

  update : interfaces.utilities.storageManager.payment.Update;
  updateById : interfaces.utilities.storageManager.payment.UpdateById;

  remove : interfaces.utilities.storageManager.payment.Remove;
  removeById : interfaces.utilities.storageManager.payment.RemoveById;
};

export interface StorageAirtimeTransfer extends StorageController {
  get : interfaces.utilities.storageManager.airtimeTransfer.Get;
  getById : interfaces.utilities.storageManager.airtimeTransfer.GetById;

  add : interfaces.utilities.storageManager.airtimeTransfer.Add;
  addBatch : interfaces.utilities.storageManager.airtimeTransfer.AddBatch;

  update : interfaces.utilities.storageManager.airtimeTransfer.Update;
  updateById : interfaces.utilities.storageManager.airtimeTransfer.UpdateById;

  remove : interfaces.utilities.storageManager.airtimeTransfer.Remove;
  removeById : interfaces.utilities.storageManager.airtimeTransfer.RemoveById;
};

export interface StorageCall extends StorageController {
  get : interfaces.utilities.storageManager.call.Get;
  getById : interfaces.utilities.storageManager.call.GetById;

  add : interfaces.utilities.storageManager.call.Add;
  addBatch : interfaces.utilities.storageManager.call.AddBatch;

  update : interfaces.utilities.storageManager.call.Update;
  updateById : interfaces.utilities.storageManager.call.UpdateById;

  remove : interfaces.utilities.storageManager.call.Remove;
  removeById : interfaces.utilities.storageManager.call.RemoveById;

};

/******************************************************************************/

export interface StorageShop extends StorageController {
  get : interfaces.utilities.storageManager.shop.Get;
  getById : interfaces.utilities.storageManager.shop.GetById;

  add : interfaces.utilities.storageManager.shop.Add;
  addBatch : interfaces.utilities.storageManager.shop.AddBatch;

  update : interfaces.utilities.storageManager.shop.Update;
  updateById : interfaces.utilities.storageManager.shop.UpdateById;

  remove : interfaces.utilities.storageManager.shop.Remove;
  removeById : interfaces.utilities.storageManager.shop.RemoveById;
};

export interface StorageProduct extends StorageController {
  get : interfaces.utilities.storageManager.product.Get;
  getById : interfaces.utilities.storageManager.product.GetById;

  add : interfaces.utilities.storageManager.product.Add;
  addBatch : interfaces.utilities.storageManager.product.AddBatch;

  update : interfaces.utilities.storageManager.product.Update;
  updateById : interfaces.utilities.storageManager.product.UpdateById;

  remove : interfaces.utilities.storageManager.product.Remove;
  removeById : interfaces.utilities.storageManager.product.RemoveById;
};

export interface StoragePrice extends StorageController {
  get : interfaces.utilities.storageManager.price.Get;
  getById : interfaces.utilities.storageManager.price.GetById;

  add : interfaces.utilities.storageManager.price.Add;
  addBatch : interfaces.utilities.storageManager.price.AddBatch;

  update : interfaces.utilities.storageManager.price.Update;
  updateById : interfaces.utilities.storageManager.price.UpdateById;

  remove : interfaces.utilities.storageManager.price.Remove;
  removeById : interfaces.utilities.storageManager.price.RemoveById;
};

export interface StorageRound extends StorageController {
  get : interfaces.utilities.storageManager.round.Get;
  getById : interfaces.utilities.storageManager.round.GetById;

  add : interfaces.utilities.storageManager.round.Add;
  addBatch : interfaces.utilities.storageManager.round.AddBatch;

  update : interfaces.utilities.storageManager.round.Update;
  updateById : interfaces.utilities.storageManager.round.UpdateById;

  remove : interfaces.utilities.storageManager.round.Remove;
  removeById : interfaces.utilities.storageManager.round.RemoveById;
};

export interface StorageRoundContributor extends StorageController {
  get : interfaces.utilities.storageManager.roundContributor.Get;
  getById : interfaces.utilities.storageManager.roundContributor.GetById;

  add : interfaces.utilities.storageManager.roundContributor.Add;
  addBatch : interfaces.utilities.storageManager.roundContributor.AddBatch;

  update : interfaces.utilities.storageManager.roundContributor.Update;
  updateById : interfaces.utilities.storageManager.roundContributor.UpdateById;

  remove : interfaces.utilities.storageManager.roundContributor.Remove;
  removeById : interfaces.utilities.storageManager.roundContributor.RemoveById;
};

export interface StorageTrack extends StorageController {
  get : interfaces.utilities.storageManager.track.Get;
  getById : interfaces.utilities.storageManager.track.GetById;

  add : interfaces.utilities.storageManager.track.Add;
  addBatch : interfaces.utilities.storageManager.track.AddBatch;

  update : interfaces.utilities.storageManager.track.Update;
  updateById : interfaces.utilities.storageManager.track.UpdateById;

  remove : interfaces.utilities.storageManager.track.Remove;
  removeById : interfaces.utilities.storageManager.track.RemoveById;
};

export interface StorageTrackProduct extends StorageController {
  get : interfaces.utilities.storageManager.trackProduct.Get;
  getById : interfaces.utilities.storageManager.trackProduct.GetById;

  add : interfaces.utilities.storageManager.trackProduct.Add;
  addBatch : interfaces.utilities.storageManager.trackProduct.AddBatch;

  update : interfaces.utilities.storageManager.trackProduct.Update;
  updateById : interfaces.utilities.storageManager.trackProduct.UpdateById;

  remove : interfaces.utilities.storageManager.trackProduct.Remove;
  removeById : interfaces.utilities.storageManager.trackProduct.RemoveById;
};

export interface StorageContribution extends StorageController {
  get : interfaces.utilities.storageManager.contribution.Get;
  getById : interfaces.utilities.storageManager.contribution.GetById;

  add : interfaces.utilities.storageManager.contribution.Add;
  addBatch : interfaces.utilities.storageManager.contribution.AddBatch;

  update : interfaces.utilities.storageManager.contribution.Update;
  updateById : interfaces.utilities.storageManager.contribution.UpdateById;

  remove : interfaces.utilities.storageManager.contribution.Remove;
  removeById : interfaces.utilities.storageManager.contribution.RemoveById;
};

export interface StorageDeliveryFee extends StorageController {
  get : interfaces.utilities.storageManager.deliveryFee.Get;
  getById : interfaces.utilities.storageManager.deliveryFee.GetById;

  add : interfaces.utilities.storageManager.deliveryFee.Add;
  addBatch : interfaces.utilities.storageManager.deliveryFee.AddBatch;

  update : interfaces.utilities.storageManager.deliveryFee.Update;
  updateById : interfaces.utilities.storageManager.deliveryFee.UpdateById;

  remove : interfaces.utilities.storageManager.deliveryFee.Remove;
  removeById : interfaces.utilities.storageManager.deliveryFee.RemoveById;
};

export interface StorageCart extends StorageController {
  get : interfaces.utilities.storageManager.cart.Get;
  getById : interfaces.utilities.storageManager.cart.GetById;

  add : interfaces.utilities.storageManager.cart.Add;
  addBatch : interfaces.utilities.storageManager.cart.AddBatch;

  update : interfaces.utilities.storageManager.cart.Update;
  updateById : interfaces.utilities.storageManager.cart.UpdateById;

  remove : interfaces.utilities.storageManager.cart.Remove;
  removeById : interfaces.utilities.storageManager.cart.RemoveById;
};

export interface StorageCartProduct extends StorageController {
  get : interfaces.utilities.storageManager.cartProduct.Get;
  getById : interfaces.utilities.storageManager.cartProduct.GetById;

  add : interfaces.utilities.storageManager.cartProduct.Add;
  addBatch : interfaces.utilities.storageManager.cartProduct.AddBatch;

  update : interfaces.utilities.storageManager.cartProduct.Update;
  updateById : interfaces.utilities.storageManager.cartProduct.UpdateById;

  remove : interfaces.utilities.storageManager.cartProduct.Remove;
  removeById : interfaces.utilities.storageManager.cartProduct.RemoveById;
};

export interface StorageDisbursement extends StorageController {
  get : interfaces.utilities.storageManager.disbursement.Get;
  getById : interfaces.utilities.storageManager.disbursement.GetById;

  add : interfaces.utilities.storageManager.disbursement.Add;
  addBatch : interfaces.utilities.storageManager.disbursement.AddBatch;

  update : interfaces.utilities.storageManager.disbursement.Update;
  updateById : interfaces.utilities.storageManager.disbursement.UpdateById;

  remove : interfaces.utilities.storageManager.disbursement.Remove;
  removeById : interfaces.utilities.storageManager.disbursement.RemoveById;
};

export interface StorageArticle extends StorageController {
  get : interfaces.utilities.storageManager.article.Get;
  getById : interfaces.utilities.storageManager.article.GetById;

  add : interfaces.utilities.storageManager.article.Add;
  addBatch : interfaces.utilities.storageManager.article.AddBatch;

  update : interfaces.utilities.storageManager.article.Update;
  updateById : interfaces.utilities.storageManager.article.UpdateById;

  remove : interfaces.utilities.storageManager.article.Remove;
  removeById : interfaces.utilities.storageManager.article.RemoveById;
};


/******************************************************************************/
