module GrocRoundAdminAddEditDeliveryFeeComponentInterfaces {

  /*******************************************/

  import deliveryFeesService = GrocRoundAdminDeliveryFeesServiceInterfaces;
  import deliveryFee = DeliveryFee;

  /*******************************************/

  export interface Instance {
    editMode: boolean;
    errorMessage: string;

    loading: boolean;
    adding: boolean;
    updating: boolean;

    addDetails: deliveryFeesService.AddDetails;
    updateDetails: deliveryFeesService.UpdateDetails;

    addDeliveryFee: AddDeliveryFee;
    updateDeliveryFee: UpdateDeliveryFee;
  }

  /*******************************************/

  export interface AddDeliveryFee {
    ( details: deliveryFeesService.UpdateDetails ): any;
  }

  export interface UpdateDeliveryFee {
    ( deliveryFeeId: string, details: deliveryFeesService.UpdateDetails ): any;
  }

  /*******************************************/

}
