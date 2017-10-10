module GrocRoundAdminAddEditProductComponentInterfaces {

  /*******************************************/

  import productsService = GrocRoundAdminProductsServiceInterfaces;
  import product = Product;

  /*******************************************/

  export interface Instance {
    editMode: boolean;
    errorMessage: string;

    loading: boolean;
    adding: boolean;
    updating: boolean;
    deleting: boolean;

    loadingPrices: boolean;
    addingPrice: boolean;
    updatingPrice: boolean;
    deletingPrice: boolean;

    addDetails: productsService.AddDetails;
    updateDetails: productsService.UpdateDetails;
    productId?: string;

    addProduct: AddProduct;
    updateProduct: UpdateProduct;
    deleteProduct: DeleteProduct;
    
  }

  /*******************************************/

  export interface AddProduct {
    ( details: productsService.UpdateDetails ): any;
  }

  export interface UpdateProduct {
    ( productId: string, details: productsService.UpdateDetails ): any;
  }

  export interface DeleteProduct {
    ( productId: string ): any;
  }

  /*******************************************/
  
}
