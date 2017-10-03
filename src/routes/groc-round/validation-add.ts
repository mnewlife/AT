/******************************************************************************/

import * as express from "express";

export let round = ( req: express.Request ): boolean => {

  if ( !req.body.round || typeof req.body.round !== "object" ) {
    return true;
  }
  if ( !req.body.round.roundId || typeof req.body.round.roundId !== "string" ) {
    return true;
  }
  if ( !req.body.round.roundName || typeof req.body.round.roundName !== "string" ) {
    return true;
  }

  return false;

}

export let shop = ( req: express.Request ): boolean => {

  if ( !req.body.shop || typeof req.body.shop !== "object" ) {
    return true;
  }
  if ( !req.body.shop.shopId || typeof req.body.shop.shopId !== "string" ) {
    return true;
  }
  if ( !req.body.shop.shopName || typeof req.body.shop.shopName !== "string" ) {
    return true;
  }

  return false;

}

export let track = ( req: express.Request ): boolean => {

  if ( !req.body.track || typeof req.body.track !== "object" ) {
    return true;
  }
  if ( !req.body.track.trackId || typeof req.body.track.trackId !== "string" ) {
    return true;
  }
  if ( !req.body.track.trackName || typeof req.body.track.trackName !== "string" ) {
    return true;
  }

  return false;

}

export let product = ( req: express.Request ): boolean => {

  if ( !req.body.product || typeof req.body.product !== "object" ) {
    return true;
  }
  if ( !req.body.product.productId || typeof req.body.product.productId !== "string" ) {
    return true;
  }
  if ( !req.body.product.label || typeof req.body.product.label !== "string" ) {
    return true;
  }

  return false;

}

/******************************************************************************/