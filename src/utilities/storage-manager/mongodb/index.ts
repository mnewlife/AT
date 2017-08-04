/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
let mongoose = require( "mongoose" );

import * as interfaces from "../../../interfaces/index";

import * as userFactory from "./user/index";
import * as eventFactory from "./event/index";
import * as progressionFactory from "./progression/index";
import * as notificationFactory from "./notification/index";
import * as invitationFactory from "./invitation/index";
import * as subscriptionFactory from "./subscription/index";

import * as channelFactory from "./channel/index";
import * as paymentFactory from "./payment/index";
import * as airtimeTransferFactory from "./airtime-transfer/index";
import * as callFactory from "./call/index";

import * as shopFactory from "./shop/index";
import * as productFactory from "./product/index";
import * as priceFactory from "./price/index";
import * as roundFactory from "./round/index";
import * as roundContributorFactory from "./round-contributor/index";
import * as trackFactory from "./track/index";
import * as trackProductFactory from "./track-product/index";
import * as contributionFactory from "./contribution/index";
import * as deliveryFeeFactory from "./delivery-fee/index";
import * as cartFactory from "./cart/index";
import * as cartProductFactory from "./cart-product/index";
import * as disbursementFactory from "./disbursement/index";
import * as articleFactory from "./article/index";

/******************************************************************************/

mongoose.Promise = Promise;

/******************************************************************************/

class MongodbStorage implements interfaces.utilities.StorageManager {

  readonly user : interfaces.utilities.storageManager.StorageUser;
  readonly event : interfaces.utilities.storageManager.StorageEvent;
  readonly progression : interfaces.utilities.storageManager.StorageProgression;
  readonly notification : interfaces.utilities.storageManager.StorageNotification;
  readonly invitation : interfaces.utilities.storageManager.StorageInvitation;

  readonly subscription : interfaces.utilities.storageManager.StorageSubscription;
  readonly channel : interfaces.utilities.storageManager.StorageChannel;
  readonly payment : interfaces.utilities.storageManager.StoragePayment;
  readonly airtimeTransfer : interfaces.utilities.storageManager.StorageAirtimeTransfer;
  readonly call : interfaces.utilities.storageManager.StorageCall;

  readonly shop : interfaces.utilities.storageManager.StorageShop;
  readonly product : interfaces.utilities.storageManager.StorageProduct;
  readonly price : interfaces.utilities.storageManager.StoragePrice;
  readonly round : interfaces.utilities.storageManager.StorageRound;
  readonly roundContributor : interfaces.utilities.storageManager.StorageRoundContributor;
  readonly track : interfaces.utilities.storageManager.StorageTrack;
  readonly trackProduct : interfaces.utilities.storageManager.StorageTrackProduct;
  readonly contribution : interfaces.utilities.storageManager.StorageContribution;
  readonly deliveryFee : interfaces.utilities.storageManager.StorageDeliveryFee;
  readonly cart : interfaces.utilities.storageManager.StorageCart;
  readonly cartProduct : interfaces.utilities.storageManager.StorageCartProduct;
  readonly disbursement : interfaces.utilities.storageManager.StorageDisbursement;
  readonly article : interfaces.utilities.storageManager.StorageArticle;

  readonly middleware : express.RequestHandler[] = [];

  /*****************************************************************/

  constructor ( private readonly config : interfaces.Config , params : any ) {

    this.connectToDatabase( params.linkToDB );

<<<<<<< HEAD
    this.user = params.userControllerFactory( config , config.utilities.sharedLogic.dataStructures.mapDetails );
=======
    this.user = params.userControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
<<<<<<< HEAD
>>>>>>> workarea
    this.event = params.eventControllerFactory( config );
    this.progression = params.progressionControllerFactory( config );
    this.notification = params.notificationControllerFactory( config );
    this.invitation = params.invitationControllerFactory( config );
    this.subscription = params.subscriptionControllerFactory( config );

    this.channel = params.channelControllerFactory( config );
    this.payment = params.paymentControllerFactory( config );
    this.airtimeTransfer = params.airtimeTransferControllerFactory( config );
    this.call = params.callControllerFactory( config );

    this.shop = params.shopControllerFactory( config );
    this.product = params.productControllerFactory( config );
    this.price = params.priceControllerFactory( config );
    this.round = params.roundControllerFactory( config );
    this.roundContributor = params.roundContributorControllerFactory( config );
    this.track = params.trackControllerFactory( config );
    this.trackProduct = params.trackProductControllerFactory( config );
    this.contribution = params.contributionControllerFactory( config );
    this.deliveryFee = params.deliveryFeeControllerFactory( config );
    this.cart = params.cartControllerFactory( config );
    this.cartProduct = params.cartProductControllerFactory( config );
    this.disbursement = params.disbursementControllerFactory( config );
    this.article = params.articleControllerFactory( config );
=======
    this.event = params.eventControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.progression = params.progressionControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.notification = params.notificationControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.invitation = params.invitationControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.subscription = params.subscriptionControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );

    this.channel = params.channelControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.payment = params.paymentControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.airtimeTransfer = params.airtimeTransferControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.call = params.callControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );

    this.shop = params.shopControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.product = params.productControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.price = params.priceControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.round = params.roundControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.roundContributor = params.roundContributorControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.track = params.trackControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.trackProduct = params.trackProductControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.contribution = params.contributionControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.deliveryFee = params.deliveryFeeControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.cart = params.cartControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.cartProduct = params.cartProductControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.disbursement = params.disbursementControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
    this.article = params.articleControllerFactory( config.eventManager.emit , config.utilities.sharedLogic.dataStructures.mapDetails );
>>>>>>> workarea

  }

  /*****************************************************************/

  private readonly connectToDatabase = ( linkToDB : string ) : void => {

    mongoose.connect( linkToDB , function ( err : any , res : any ) {
      if ( err ) {
        throw new Error( "Error connecting to database : " + linkToDB + ", Error details : " + err );
      } else {
        console.log( "Connected to MongoDB database : " + linkToDB );
      }
    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( config : interfaces.Config ) : interfaces.utilities.StorageManager => {

  let productionLink = "mongodb://AllanSimoyi:tatenda#1@ds157499.mlab.com:57499/ximex";
  let developmentLink = "mongodb://127.0.0.1:27017/Ximex";

  const params = {
    linkToDB : ( config.environment.production ? productionLink : developmentLink ) ,

    user : userFactory ,
    event : eventFactory ,
    progression : progressionFactory ,
    notification : notificationFactory ,
    invitation : invitationFactory ,
    subscription : subscriptionFactory ,

    channel : channelFactory ,
    payment : paymentFactory ,
    airtimeTransfer : airtimeTransferFactory ,
    call : callFactory ,

    shop : shopFactory ,
    product : productFactory ,
    price : priceFactory ,
    round : roundFactory ,
    roundContributor : roundContributorFactory ,
    track : trackFactory ,
    trackProduct : trackProductFactory ,
    contribution : contributionFactory ,
    deliveryFee : deliveryFeeFactory ,
    cart : cartFactory ,
    cartProduct : cartProductFactory ,
    disbursement : disbursementFactory ,
    article : articleFactory
  };

  return new MongodbStorage( config , params );

};

/******************************************************************************/
