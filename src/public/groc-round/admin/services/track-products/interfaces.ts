module GrocRoundAdminTrackProductsServiceInterfaces {

  /*******************************************/

  import trackProduct = TrackProduct;
  import track = Track;
  import product = Product;

  export interface Instance {
    getTrackProducts: GetTrackProducts;
    getTrackProduct: GetTrackProduct;
    addTrackProduct: AddTrackProduct;
    updateTrackProduct: UpdateTrackProduct;
    removeTrackProduct: RemoveTrackProduct;
  }

  /*******************************************/

  export interface AddDetails {
    track: track.TrackInfo;
    product: product.ProductInfo;
    quantity: number;
    value: number;
  }

  /******************************************************************************/

  export type UpdateDetails = Partial<{
    quantity: number;
    value: number;
  }>;

  /*******************************************/

  export interface GetTrackProducts {
    ( track: string ): ng.IPromise<trackProduct.Super[]>;
  }

  export interface GetTrackProduct {
    ( trackProductId: string ): ng.IPromise<trackProduct.Super>;
  }

  export interface AddTrackProduct {
    ( details: AddDetails ): ng.IPromise<trackProduct.Super>;
  }

  export interface UpdateTrackProduct {
    ( trackProductId: string, details: UpdateDetails ): ng.IPromise<trackProduct.Super>;
  }

  export interface RemoveTrackProduct {
    ( trackProductId: string ): ng.IPromise<void>;
  }

  /*******************************************/

}
