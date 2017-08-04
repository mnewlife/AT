/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../interfaces/index";

/******************************************************************************/

export interface AirtimeTransferModel extends interfaces.dataModel.AirtimeTransfer, mongoose.Document { }
export interface ArticleModel extends interfaces.dataModel.Article, mongoose.Document { }
export interface CallModel extends interfaces.dataModel.Call, mongoose.Document { }
export interface CartModel extends interfaces.dataModel.Cart, mongoose.Document { }
export interface CartProductModel extends interfaces.dataModel.CartProduct, mongoose.Document { }
export interface ChannelModel extends interfaces.dataModel.Channel, mongoose.Document { }
export interface ContributionModel extends interfaces.dataModel.Contribution, mongoose.Document { }
export interface DeliveryFeeModel extends interfaces.dataModel.DeliveryFee, mongoose.Document { }
export interface DisbursementModel extends interfaces.dataModel.Disbursement, mongoose.Document { }
export interface EventModel extends interfaces.dataModel.Event, mongoose.Document { }
export interface InvitationModel extends interfaces.dataModel.Invitation, mongoose.Document { }
export interface NotificationModel extends interfaces.dataModel.Notification, mongoose.Document { }
export interface PaymentModel extends interfaces.dataModel.Payment, mongoose.Document { }
export interface PriceModel extends interfaces.dataModel.Price, mongoose.Document { }
export interface ProductModel extends interfaces.dataModel.Product, mongoose.Document { }
export interface ProgressionModel extends interfaces.dataModel.Progression, mongoose.Document { }
export interface RoundModel extends interfaces.dataModel.Round, mongoose.Document { }
export interface RoundContributorModel extends interfaces.dataModel.RoundContributor, mongoose.Document { }
export interface ShopModel extends interfaces.dataModel.Shop, mongoose.Document { }
export interface SubscriptionModel extends interfaces.dataModel.Subscription, mongoose.Document { }
export interface TrackModel extends interfaces.dataModel.Track, mongoose.Document { }
export interface TrackProductModel extends interfaces.dataModel.TrackProduct, mongoose.Document { }
export interface UserModel extends interfaces.dataModel.User, mongoose.Document { }

/******************************************************************************/

