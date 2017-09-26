module GrocRoundAdminAddEditShopComponentInterfaces {

  /*******************************************/

  import shopsService = GrocRoundAdminShopsServiceInterfaces;
  import shop = Shop;

  /*******************************************/

  export interface Instance {
    editMode: boolean;    
    errorMessage: string;

    loading: boolean;
    adding: boolean;
    updating: boolean;
    deleting: boolean;

    addDetails: shopsService.AddDetails;
    updateDetails: shopsService.UpdateDetails;
    shopId?: string;

    addShop: AddShop;
    updateShop: UpdateShop;
    deleteShop: DeleteShop;
  }

  /*******************************************/

  export interface AddShop {
    ( details: shopsService.UpdateDetails ): any;
  }

  export interface UpdateShop {
    ( shopId: string, details: shopsService.UpdateDetails ): any;
  }

  export interface DeleteShop {
    ( shopId: string ): any;
  }

  /*******************************************/

}
