/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as grocRoundInterfaces from "../../../interfaces/components/groc-round/index";

import cartProductsFactory from "./cart-products/index";
import cartsFactory from "./carts/index";
import contributionsFactory from "./contributions/index";
import deliveryFeesFactory from "./delivery-fees/index";
import productsFactory from "./products/index";
import roundsFactory from "./rounds/index";
import shopsFactory from "./shops/index";
import trackProductsFactory from "./track-products/index";
import tracksFactory from "./tracks/index";
import usersFactory from "./users/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Admin implements grocRoundInterfaces.Admin {

  readonly cartProducts: grocRoundInterfaces.admin.CartProducts;
  readonly carts: grocRoundInterfaces.admin.Carts;
  readonly contributions: grocRoundInterfaces.admin.Contributions;
  readonly deliveryFees: grocRoundInterfaces.admin.DeliveryFees;
  readonly products: grocRoundInterfaces.admin.Products;
  readonly rounds: grocRoundInterfaces.admin.Rounds;
  readonly shops: grocRoundInterfaces.admin.Shops;
  readonly trackProducts: grocRoundInterfaces.admin.TrackProducts;
  readonly tracks: grocRoundInterfaces.admin.Tracks;
  readonly users: grocRoundInterfaces.admin.Users;

  constructor( params: grocRoundInterfaces.admin.Params ) {
    this.cartProducts = params.cartProducts;
    this.carts = params.carts;
    this.contributions = params.contributions;
    this.deliveryFees = params.deliveryFees;
    this.products = params.products;
    this.rounds = params.rounds;
    this.shops = params.shops;
    this.trackProducts = params.trackProducts;
    this.users = params.users;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: grocRoundInterfaces.SharedCode ): grocRoundInterfaces.Admin => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Admin( {
    cartProducts: cartProductsFactory( config.eventManager.emit, localSharedCode ),
    carts: cartsFactory( config.eventManager.emit, localSharedCode ),
    contributions: contributionsFactory( config.eventManager.emit, localSharedCode ),
    deliveryFees: deliveryFeesFactory( config.eventManager.emit, localSharedCode ),
    products: productsFactory( config.eventManager.emit, localSharedCode ),
    rounds: roundsFactory( config.eventManager.emit, localSharedCode ),
    shops: shopsFactory( config.eventManager.emit, localSharedCode ),
    trackProducts: trackProductsFactory( config.eventManager.emit, localSharedCode ),
    tracks: tracksFactory( config.eventManager.emit, localSharedCode ),
    users: usersFactory( config.eventManager.emit, localSharedCode ),
  } );
}

/******************************************************************************/

