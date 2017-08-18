/******************************************************************************/

import * as appStorage from "../../../../src/components/storage/call-263";

import * as airtimePayment from "./airtime-payment";
import * as airtimeTransfer from "./airtime-transfer";
import * as channel from "./channel";
import * as events from "./events";

/******************************************************************************/

export { airtimePayment, airtimeTransfer, channel, events };

/******************************************************************************/

export interface StorageController { }

/******************************************************************************/

export interface AirtimePayment extends StorageController {
  get: appStorage.airtimePayment.Get;
  getById: appStorage.airtimePayment.GetById;

  add: appStorage.airtimePayment.Add;
  addBatch: appStorage.airtimePayment.AddBatch;

  update: appStorage.airtimePayment.Update;
  updateById: appStorage.airtimePayment.UpdateById;

  remove: appStorage.airtimePayment.Remove;
  removeById: appStorage.airtimePayment.RemoveById;
}

/******************************************************************************/

export interface AirtimeTransfer extends StorageController {
  get: appStorage.airtimeTransfer.Get;
  getById: appStorage.airtimeTransfer.GetById;

  add: appStorage.airtimeTransfer.Add;
  addBatch: appStorage.airtimeTransfer.AddBatch;

  update: appStorage.airtimeTransfer.Update;
  updateById: appStorage.airtimeTransfer.UpdateById;

  remove: appStorage.airtimeTransfer.Remove;
  removeById: appStorage.airtimeTransfer.RemoveById;
};

/******************************************************************************/

export interface Channel extends StorageController {
  get: appStorage.channel.Get;
  getById: appStorage.channel.GetById;

  add: appStorage.channel.Add;
  addBatch: appStorage.channel.AddBatch;

  update: appStorage.channel.Update;
  updateById: appStorage.channel.UpdateById;

  remove: appStorage.channel.Remove;
  removeById: appStorage.channel.RemoveById;
};

/******************************************************************************/