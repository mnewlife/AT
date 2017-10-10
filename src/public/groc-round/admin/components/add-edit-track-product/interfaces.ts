module GrocRoundAdminAddEditTrackProductComponentInterfaces {

  /*******************************************/

  import trackProductsService = GrocRoundAdminTrackProductsServiceInterfaces;
  import trackProduct = TrackProduct;

  /*******************************************/

  export interface Instance {
    editMode: boolean;
    errorMessage: string;

    loading: boolean;
    adding: boolean;
    updating: boolean;

    addDetails: trackProductsService.AddDetails;
    updateDetails: trackProductsService.UpdateDetails;

    addTrackProduct: AddTrackProduct;
    updateTrackProduct: UpdateTrackProduct;
  }

  /*******************************************/

  export interface AddTrackProduct {
    ( details: trackProductsService.UpdateDetails ): any;
  }

  export interface UpdateTrackProduct {
    ( trackProductId: string, details: trackProductsService.UpdateDetails ): any;
  }

  /*******************************************/

}
