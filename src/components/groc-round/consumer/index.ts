/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as grocRoundInterfaces from "../../../interfaces/components/groc-round/index";

import cartFactory from "./cart/index";
import cartProductsFactory from "./cart-products/index";
import contributionsFactory from "./contributions/index";
import deliveryFeesFactory from "./delivery-fees/index";
import productsFactory from "./products/index";
import roundsFactory from "./rounds/index";
import trackProductsFactory from "./track-products/index";
import tracksFactory from "./tracks/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Consumer implements grocRoundInterfaces.Consumer {

  readonly cart: grocRoundInterfaces.consumer.Cart;
  readonly cartProducts: grocRoundInterfaces.consumer.CartProducts;
  readonly contributions: grocRoundInterfaces.consumer.Contributions;
  readonly deliveryFees: grocRoundInterfaces.consumer.DeliveryFees;
  readonly products: grocRoundInterfaces.consumer.Products;
  readonly rounds: grocRoundInterfaces.consumer.Rounds;
  readonly trackProducts: grocRoundInterfaces.consumer.TrackProducts;
  readonly tracks: grocRoundInterfaces.consumer.Tracks;

  constructor( params: grocRoundInterfaces.consumer.Params ) {
    this.cart = params.cart;
    this.cartProducts = params.cartProducts;
    this.contributions = params.contributions;
    this.deliveryFees = params.deliveryFees;
    this.products = params.products;
    this.rounds = params.rounds;
    this.trackProducts = params.trackProducts;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: grocRoundInterfaces.SharedCode ): grocRoundInterfaces.Consumer => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Consumer( {
    cart: cartFactory( config.eventManager.emit, localSharedCode ),
    cartProducts: cartProductsFactory( config.eventManager.emit, localSharedCode ),
    contributions: contributionsFactory( config.eventManager.emit, localSharedCode ),
    deliveryFees: deliveryFeesFactory( config.eventManager.emit, localSharedCode ),
    products: productsFactory( config.eventManager.emit, localSharedCode ),
    rounds: roundsFactory( config.eventManager.emit, localSharedCode ),
    trackProducts: trackProductsFactory( config.eventManager.emit, localSharedCode ),
    tracks: tracksFactory( config.eventManager.emit, localSharedCode )
  } );
}

/******************************************************************************/

