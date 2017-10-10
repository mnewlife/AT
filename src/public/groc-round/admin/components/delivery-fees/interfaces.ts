module GrocRoundAdminDeliveryFeesComponentInterfaces {
  
    /*******************************************/
  
    import deliveryFee = DeliveryFee;
    import profileService = GrocRoundAdminDeliveryFeesServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      deliveryFees: deliveryFee.Super[];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  