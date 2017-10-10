module TrackProduct {

  /******************************************************************************/

  import dataModel = DataModel;
  import track = Track;
  import product = Product;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    track: track.TrackInfo;
    product: product.ProductInfo;
    quantity: number;
    value: number;
  }

  /******************************************************************************/

}